// functions/update-tenant-bill.js
const { getData, saveData } = require('./util/db-helpers');
const jwt = require('jsonwebtoken');

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
    // Parse request body
    const data = JSON.parse(event.body);
    
    if (!data.tenantId || data.newBalance === undefined) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Bad request', 
          message: 'Tenant ID and new balance are required' 
        })
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
    
    // Find the tenant to update
    const tenantIndex = tenants.findIndex(t => t.id === data.tenantId);
    
    if (tenantIndex === -1) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Tenant not found' })
      };
    }
    
    // Update the tenant balance
    const previousBalance = tenants[tenantIndex].balance;
    tenants[tenantIndex].previousBalance = previousBalance;
    tenants[tenantIndex].balance = data.newBalance;
    tenants[tenantIndex].lastUpdated = new Date().toISOString();
    
    // Save updated tenants
    const saveSuccess = await saveData('customers.json', tenants);
    
    if (!saveSuccess) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to save tenant updates',
        })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Tenant balance updated successfully',
        tenant: tenants[tenantIndex]
      })
    };
    
  } catch (error) {
    console.error('Error updating tenant:', error);
    
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