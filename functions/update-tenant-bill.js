// functions/update-tenant-bill.js
const { getData, saveData } = require('./util/secure-db');
const jwt = require('jsonwebtoken');

// Verify admin JWT token
function verifyAdminToken(token) {
  const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  // Check for admin authentication
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  const token = authHeader.split(' ')[1];
  if (!verifyAdminToken(token)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Forbidden - Admin access required' })
    };
  }
  
  try {
    const { tenantId, newBalance } = JSON.parse(event.body);
    
    // Get tenants data
    const tenants = await getData('customers.json');
    
    // Find tenant by ID
    const tenantIndex = tenants.findIndex(t => t.id === tenantId);
    
    if (tenantIndex === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Tenant not found' })
      };
    }
    
    // Update balance
    const previousBalance = tenants[tenantIndex].balance;
    tenants[tenantIndex].previousBalance = previousBalance;
    tenants[tenantIndex].balance = newBalance;
    tenants[tenantIndex].lastUpdated = new Date().toISOString();
    
    // Save updated data
    const saveSuccess = await saveData('customers.json', tenants);
    
    if (!saveSuccess) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save tenant updates' })
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Tenant bill updated successfully',
        tenant: tenants[tenantIndex]
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', message: error.message })
    };
  }
};