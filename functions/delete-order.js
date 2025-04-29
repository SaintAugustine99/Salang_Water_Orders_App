// functions/delete-order.js
const { getJsonData, saveJsonData } = require('./util/db-helpers');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

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
  
  // Check for authentication
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);
    
    if (!data.id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Bad request', 
          message: 'Order ID is required' 
        })
      };
    }
    
    // Get orders from database
    const orders = await getJsonData('orders.json');
    
    if (!orders || !Array.isArray(orders)) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Orders database not found' })
      };
    }
    
    // Find the order to delete
    const orderIndex = orders.findIndex(o => o.id === data.id);
    
    if (orderIndex === -1) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Order not found' })
      };
    }
    
    // Remove the order
    const deletedOrder = orders.splice(orderIndex, 1)[0];
    
    // Save updated orders
    await saveJsonData('orders.json', orders);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order deleted successfully',
        order: deletedOrder
      })
    };
    
  } catch (error) {
    console.error('Error deleting order:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};