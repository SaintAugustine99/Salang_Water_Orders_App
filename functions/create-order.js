// functions/create-order.js
const fs = require('fs');
const path = require('path');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
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
      console.log('Created data directory at:', DATA_DIR);
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
    console.log('Successfully saved to:', ORDERS_FILE);
    return true;
  } catch (error) {
    console.error('Error writing to orders file:', error);
    
    // Try to save to /tmp backup as fallback
    try {
      await fs.promises.writeFile(
        TMP_ORDERS_FILE,
        JSON.stringify(orders, null, 2),
        'utf8'
      );
      console.log('Successfully saved to backup location:', TMP_ORDERS_FILE);
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
  
  try {
    console.log('Received create order request');
    const orderData = JSON.parse(event.body);
    
    // Basic validation
    if (!orderData.name || !orderData.phone || !orderData.address || !orderData.quantity) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields',
          requiredFields: ['name', 'phone', 'address', 'quantity']
        })
      };
    }
    
    // Generate a simple order ID
    const orderId = Date.now().toString();
    
    // Create order object
    const newOrder = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    
    console.log('Processing new order with ID:', orderId);
    
    // Get existing orders
    let orders = await getOrders();
    
    // If no orders found or not an array, initialize as empty array
    if (!orders || !Array.isArray(orders)) {
      console.log('No existing orders found, initializing empty array');
      orders = [];
    }
    
    // Add new order
    orders.push(newOrder);
    
    // Save updated orders
    const saveSuccess = await saveOrders(orders);
    
    if (!saveSuccess) {
      console.error('Failed to save order');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to save order',
          message: 'Could not write to order database'
        })
      };
    }
    
    console.log('Order saved successfully');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order created successfully',
        orderId: orderId
      })
    };
  } catch (error) {
    console.error('Error creating order:', error);
    
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