// functions/util/db-helpers.js
const fs = require('fs');
const path = require('path');

// Define the data directory path - using .data in the project root
const DATA_DIR = path.join(__dirname, '..', '..', '.data');

// Ensure the data directory exists
function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Created data directory at:', DATA_DIR);
    } catch (error) {
      console.error('Failed to create data directory:', error);
      // Try alternative location
      const altDir = path.join('/tmp', 'salang-data');
      if (!fs.existsSync(altDir)) {
        fs.mkdirSync(altDir, { recursive: true });
        console.log('Created alternative data directory at:', altDir);
      }
      return altDir;
    }
  }
  return DATA_DIR;
}

/**
 * Get JSON data from a file
 * @param {string} filename - The file name to read from
 * @returns {Promise<any>} - The parsed JSON data
 */
async function getJsonData(filename) {
  const dataDir = ensureDataDirExists();
  const filePath = path.join(dataDir, filename);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File ${filename} doesn't exist, returning empty array`);
      return []; // Return empty array for non-existent files
    }
    
    // Read and parse file
    const data = await fs.promises.readFile(filePath, 'utf8');
    try {
      return JSON.parse(data);
    } catch (parseError) {
      console.error(`Error parsing ${filename}:`, parseError);
      return []; // Return empty array if JSON parsing fails
    }
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return []; // Return empty array on error
  }
}

/**
 * Save JSON data to a file
 * @param {string} filename - The file name to save to
 * @param {any} data - The data to save
 * @returns {Promise<boolean>} - Success status
 */
async function saveJsonData(filename, data) {
  const dataDir = ensureDataDirExists();
  const filePath = path.join(dataDir, filename);
  
  try {
    // Write data to file
    await fs.promises.writeFile(
      filePath, 
      JSON.stringify(data, null, 2), 
      'utf8'
    );
    console.log(`Successfully wrote to ${filename}`);
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    
    // Try writing to alternative location
    try {
      const tmpPath = path.join('/tmp', filename);
      await fs.promises.writeFile(
        tmpPath,
        JSON.stringify(data, null, 2),
        'utf8'
      );
      console.log(`Successfully wrote to alternative location: ${tmpPath}`);
      return true;
    } catch (fallbackError) {
      console.error(`Failed fallback write:`, fallbackError);
      return false;
    }
  }
}

module.exports = {
  getJsonData,
  saveJsonData
};