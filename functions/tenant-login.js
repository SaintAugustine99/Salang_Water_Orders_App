// functions/tenant-login.js
const { getData } = require('./util/db-helpers');
const jwt = require('jsonwebtoken');

// CORS headers
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
    const { phone, password } = JSON.parse(event.body);
    
    // Input validation
    if (!phone || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Phone number and password are required' })
      };
    }
    
    // Get tenants data
    const tenants = await getData('customers.json');
    
    // Clean the phone number for comparison (remove non-digits)
    const cleanedPhone = phone.replace(/\D/g, '');
    
    // Find tenant by phone
    const tenant = tenants.find(t => {
      // Clean the stored phone number as well
      const storedPhone = t.phone.replace(/\D/g, '');
      
      // Check for match with or without country code
      return storedPhone === cleanedPhone || 
             storedPhone === '254' + cleanedPhone.substring(1) ||
             cleanedPhone === '254' + storedPhone.substring(1);
    });
    
    if (!tenant) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    
    // For first-time users, the password is the last 4 digits of their phone
    const defaultPassword = tenant.phone.replace(/\D/g, '').slice(-4);
    const storedPassword = tenant.password || defaultPassword;
    
    if (password !== storedPassword) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    
    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
    const token = jwt.sign(
      { 
        sub: tenant.id,
        name: tenant.name,
        role: 'tenant'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        token,
        tenant: {
          id: tenant.id,
          name: tenant.name,
          phone: tenant.phone,
          balance: tenant.balance,
          previousBalance: tenant.previousBalance || tenant.balance
        }
      })
    };
  } catch (error) {
    console.error('Error during tenant login:', error);
    
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