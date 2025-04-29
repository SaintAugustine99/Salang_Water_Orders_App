// functions/get-orders.js
const fs = require('fs');
const path = require('path');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
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
  ensureDataDirExists();
  
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

exports.handler = async function(event, context) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
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
    // Get orders from file
    const orders = await getOrders();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orders: orders || []
      })
    };
    
  } catch (error) {
    console.error('Error getting orders:', error);
    
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