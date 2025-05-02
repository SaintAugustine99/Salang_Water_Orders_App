// functions/get-tenant.js
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
    // Get tenant ID from query parameters
    const tenantId = event.queryStringParameters.id;
    
    if (!tenantId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Tenant ID is required' })
      };
    }
    
    // Get tenants data
    const tenants = await getData('customers.json');
    
    if (!tenants || !Array.isArray(tenants)) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Tenants database not found' })
      };
    }
    
    // Find the specific tenant
    const tenant = tenants.find(t => t.id === tenantId);
    
    if (!tenant) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Tenant not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        tenant: tenant
      })
    };
    
  } catch (error) {
    console.error('Error getting tenant:', error);
    
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