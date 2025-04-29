// functions/create-order.js
const { getJsonData, saveJsonData } = require('./util/db-helpers');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
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
  
  try {
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
    
    // Get existing orders
    let orders = await getJsonData('orders.json');
    
    // If no orders found or not an array, initialize as empty array
    if (!orders || !Array.isArray(orders)) {
      orders = [];
    }
    
    // Add new order
    orders.push(newOrder);
    
    // Save updated orders
    await saveJsonData('orders.json', orders);
    
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
        message: error.message
      })
    };
  }
};