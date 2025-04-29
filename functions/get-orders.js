// functions/get-orders.js
const { getJsonData } = require('./util/db-helpers');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
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
  
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
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
  
  // Extract JWT token
  const token = authHeader.split(' ')[1];
  
  // Verify identity
  try {
    // In a production environment, you should verify this token with Netlify Identity
    // For now, we'll assume it's valid if it exists
    
    // Get orders from database
    const orders = await getJsonData('orders.json');
    
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
        message: error.message
      })
    };
  }
};