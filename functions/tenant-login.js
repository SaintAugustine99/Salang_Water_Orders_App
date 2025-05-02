// functions/tenant-login.js
const crypto = require('crypto');
const { getData } = require('./util/secure-db');
const jwt = require('jsonwebtoken');

// Generate a JWT token
function generateToken(tenant) {
  const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
  return jwt.sign(
    { 
      sub: tenant.id,
      name: tenant.name,
      role: 'tenant'
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    const { phone, password } = JSON.parse(event.body);
    
    // Get tenants data
    const tenants = await getData('customers.json');
    
    // Find tenant by phone
    const tenant = tenants.find(t => t.phone.replace(/\D/g, '') === phone.replace(/\D/g, ''));
    
    if (!tenant) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    
    // For first-time users, the password is the last 4 digits of their phone
    // In a real app, you would store password hashes and use proper comparison
    const defaultPassword = tenant.phone.replace(/\D/g, '').slice(-4);
    
    if (password !== defaultPassword && password !== tenant.password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    
    // Generate token
    const token = generateToken(tenant);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token,
        tenant: {
          id: tenant.id,
          name: tenant.name,
          phone: tenant.phone,
          balance: tenant.balance
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', message: error.message })
    };
  }
};