// functions/update-order.js
const fs = require('fs');
const path = require('path');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Define the data directory path
const DATA_DIR = path.join(__dirname, '..', '.data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const TMP_ORDERS_FILE = path.join('/tmp', 'orders.json');

// Ensure the data directory exists
function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (error) {
      console.error('Failed to create data directory:', error);
    }
  }
}

// Get orders from file
async function getOrders() {
  // Try to read from primary location
  if (fs.existsSync(ORDERS_FILE)) {
    try {
      const data = await fs.promises.readFile(ORDERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading orders file:', error);
    }
  }
  
  // Try to read from /tmp backup
  if (fs.existsSync(TMP_ORDERS_FILE)) {
    try {
      const data = await fs.promises.readFile(TMP_ORDERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading backup orders file:', error);
    }
  }
  
  // If all fails, return empty array
  return [];
}

// Save orders to file
async function saveOrders(orders) {
  ensureDataDirExists();
  
  // Try to save to primary location
  try {
    await fs.promises.writeFile(
      ORDERS_FILE,
      JSON.stringify(orders, null, 2),
      'utf8'
    );
    return true;
  } catch (error) {
    console.error('Error writing to orders file:', error);
    
    // Try to save to /tmp backup
    try {
      await fs.promises.writeFile(
        TMP_ORDERS_FILE,
        JSON.stringify(orders, null, 2),
        'utf8'
      );
      return true;
    } catch (fallbackError) {
      console.error('Error writing to backup orders file:', fallbackError);
      return false;
    }
  }
}

exports.handler = async function(event, context) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  // Simple token checking - any non-empty token is accepted
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ') || !authHeader.split(' ')[1]) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);
    
    if (!data.id || !data.status) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Bad request', 
          message: 'Order ID and status are required' 
        })
      };
    }
    
    // Validate status
    const validStatuses = ['new', 'processing', 'delivered', 'cancelled'];
    if (!validStatuses.includes(data.status)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid status', 
          message: `Status must be one of: ${validStatuses.join(', ')}` 
        })
      };
    }
    
    // Get orders from file
    const orders = await getOrders();
    
    if (!orders || !Array.isArray(orders)) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Orders database not found' })
      };
    }
    
    // Find the order to update
    const orderIndex = orders.findIndex(o => o.id === data.id);
    
    if (orderIndex === -1) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Order not found' })
      };
    }
    
    // Update the order status
    orders[orderIndex].status = data.status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    // Save updated orders
    const saveSuccess = await saveOrders(orders);
    
    if (!saveSuccess) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to save order updates',
        })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order updated successfully',
        order: orders[orderIndex]
      })
    };
    
  } catch (error) {
    console.error('Error updating order:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message || 'Unknown error occurred'
      })
    };
  }
};