// functions/get-tenant-data.js
const { getData } = require('./util/db-helpers');
const jwt = require('jsonwebtoken');

// Verify JWT token
function verifyToken(token) {
  const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

exports.handler = async function(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

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
  
  // Check authentication
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded || !decoded.sub) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Invalid token' })
    };
  }
  
  try {
    // Get tenant ID from token
    const tenantId = decoded.sub;
    
    // Get tenants data
    const tenants = await getData('customers.json');
    
    // Find tenant by ID
    const tenant = tenants.find(t => t.id === tenantId);
    
    if (!tenant) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Tenant not found' })
      };
    }
    
    // Load payment history if available
    // This is placeholder - you'd need to implement actual payment history storage
    const paymentHistory = [];
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        tenant: {
          id: tenant.id,
          name: tenant.name,
          phone: tenant.phone,
          balance: tenant.balance,
          previousBalance: tenant.previousBalance || tenant.balance,
          payments: paymentHistory
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error', message: error.message })
    };
  }
};