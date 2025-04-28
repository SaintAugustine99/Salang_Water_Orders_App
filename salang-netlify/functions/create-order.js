// functions/create-order.js
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
      
      // Log the order (in a real app, you'd save this to a database)
      console.log('Order received:', {
        ...orderData,
        id: orderId,
        createdAt: new Date().toISOString(),
        status: 'new'
      });
      
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