// functions/debug.js
const fs = require('fs');
const path = require('path');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

// Define file paths to check
const paths = [
  { name: 'Project .data', path: path.join(__dirname, '..', '.data', 'orders.json') },
  { name: 'Temp directory', path: '/tmp/orders.json' },
  { name: 'Function directory', path: path.join(__dirname, 'orders.json') }
];

exports.handler = async function(event, context) {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  let results = {
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      PWD: process.env.PWD,
      LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT,
      NETLIFY: process.env.NETLIFY
    },
    fileSystem: {
      currentDir: __dirname,
      parentDir: path.join(__dirname, '..'),
      files: []
    }
  };

  // Check each path
  for (const pathInfo of paths) {
    const fileResult = {
      name: pathInfo.name,
      path: pathInfo.path,
      exists: false,
      isReadable: false,
      content: null,
      error: null
    };
    
    try {
      fileResult.exists = fs.existsSync(pathInfo.path);
      
      if (fileResult.exists) {
        try {
          const data = await fs.promises.readFile(pathInfo.path, 'utf8');
          fileResult.isReadable = true;
          
          try {
            const jsonData = JSON.parse(data);
            fileResult.content = {
              orderCount: Array.isArray(jsonData) ? jsonData.length : 'Not an array',
              firstOrder: Array.isArray(jsonData) && jsonData.length > 0 ? jsonData[0] : null,
              isArray: Array.isArray(jsonData)
            };
          } catch (parseError) {
            fileResult.error = `JSON parse error: ${parseError.message}`;
          }
        } catch (readError) {
          fileResult.error = `Read error: ${readError.message}`;
        }
      }
    } catch (error) {
      fileResult.error = `Access error: ${error.message}`;
    }
    
    results.fileSystem.files.push(fileResult);
  }
  
  // Try to get directory contents
  try {
    const dataDir = path.join(__dirname, '..', '.data');
    if (fs.existsSync(dataDir)) {
      results.fileSystem.dataDir = {
        path: dataDir,
        files: fs.readdirSync(dataDir)
      };
    }
  } catch (error) {
    results.fileSystem.dataDirError = error.message;
  }
  
  try {
    if (fs.existsSync('/tmp')) {
      results.fileSystem.tmpDir = {
        path: '/tmp',
        files: fs.readdirSync('/tmp').filter(f => f.includes('orders') || f.includes('salang'))
      };
    }
  } catch (error) {
    results.fileSystem.tmpDirError = error.message;
  }
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(results, null, 2)
  };
};