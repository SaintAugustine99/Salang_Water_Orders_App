// functions/init-customers.js
const fs = require('fs');
const path = require('path');
const { saveData } = require('./util/db-helpers');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
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
  
  // Only allow POST or GET requests
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  // For POST, require auth
  if (event.httpMethod === 'POST') {
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ') || !authHeader.split(' ')[1]) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }
  }
  
  try {
    // Check if customers.json already exists
    const dataDir = path.join(__dirname, '..', '.data');
    const customersFile = path.join(dataDir, 'customers.json');
    let customersExist = false;
    
    if (fs.existsSync(dataDir) && fs.existsSync(customersFile)) {
      customersExist = true;
    }
    
    // Get the customer data from the source file (convert-customers.js)
    const sourceFile = path.join(__dirname, '..', 'convert-customers.js');
    if (!fs.existsSync(sourceFile)) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Source file not found' })
      };
    }
    
    // Extract the customersData array from the file
    const fileContent = await fs.promises.readFile(sourceFile, 'utf8');
    const dataMatch = fileContent.match(/const\s+customersData\s*=\s*(\[\s*\{[\s\S]*?\}\s*\])\s*;/);
    
    if (!dataMatch || !dataMatch[1]) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Could not parse customers data from source file' })
      };
    }
    
    // Parse the data
    let customersData;
    try {
      // Convert the string representation to actual JSON
      // This is a bit unsafe, but necessary for parsing the data from the JS file
      customersData = eval('(' + dataMatch[1] + ')');
    } catch (parseError) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to parse customers data',
          message: parseError.message
        })
      };
    }
    
    // Save the data
    const saveResult = await saveData('customers.json', customersData);
    
    if (!saveResult) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to save customers data' })
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: customersExist ? 'Customers data reinitialized' : 'Customers data initialized',
        count: customersData.length
      })
    };
    
  } catch (error) {
    console.error('Error initializing customers:', error);
    
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