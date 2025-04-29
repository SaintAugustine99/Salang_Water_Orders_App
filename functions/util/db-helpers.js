// functions/util/db-helpers.js
const fs = require('fs');
const path = require('path');

// Define the data directory path
const DATA_DIR = path.join(__dirname, '..', '..', '.data');

// Ensure the data directory exists
function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Get JSON data from a file
 * @param {string} filename - The file name to read from
 * @returns {Promise<any>} - The parsed JSON data
 */
async function getJsonData(filename) {
  ensureDataDirExists();
  
  const filePath = path.join(DATA_DIR, filename);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Return empty array for non-existent files
      return [];
    }
    
    // Read and parse file
    const data = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

/**
 * Save JSON data to a file
 * @param {string} filename - The file name to save to
 * @param {any} data - The data to save
 * @returns {Promise<void>}
 */
async function saveJsonData(filename, data) {
  ensureDataDirExists();
  
  const filePath = path.join(DATA_DIR, filename);
  
  try {
    // Write data to file
    await fs.promises.writeFile(
      filePath, 
      JSON.stringify(data, null, 2), 
      'utf8'
    );
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

module.exports = {
  getJsonData,
  saveJsonData
};