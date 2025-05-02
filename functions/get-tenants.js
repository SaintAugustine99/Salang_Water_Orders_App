// functions/get-tenants.js
const { getData } = require('./util/db-helpers');

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
  
  // Simple token checking
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ') || !authHeader.split(' ')[1]) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  try {
    // Get customers data
    const customers = await getData('customers.json');
    
    // Apply any filters if provided in query params
    let filteredCustomers = [...customers];
    
    const { group, search } = event.queryStringParameters || {};
    
    if (group && group !== 'all') {
      filteredCustomers = filteredCustomers.filter(c => c.group === group);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        c => c.name.toLowerCase().includes(searchLower) || 
             c.id.toLowerCase().includes(searchLower) ||
             c.phone.includes(search)
      );
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        tenants: filteredCustomers
      })
    };
    
  } catch (error) {
    console.error('Error getting tenants:', error);
    
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