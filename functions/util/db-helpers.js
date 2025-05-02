// functions/util/db-helpers.js
const fs = require('fs');
const path = require('path');

// Define the data directory path - using .data in the project root
const DATA_DIR = path.join(__dirname, '..', '..', '.data');
const TMP_DIR = path.join('/tmp');

// Ensure the data directory exists
function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Created data directory at:', DATA_DIR);
    } catch (error) {
      console.error('Failed to create data directory:', error);
      // Try alternative location
      if (!fs.existsSync(TMP_DIR)) {
        fs.mkdirSync(TMP_DIR, { recursive: true });
      }
      return TMP_DIR;
    }
  }
  return DATA_DIR;
}

/**
 * Get JSON data from a file
 * @param {string} filename - The file name to read from
 * @returns {Promise<any>} - The parsed JSON data
 */
async function getData(filename) {
  const dataDir = ensureDataDirExists();
  const filePath = path.join(dataDir, filename);
  const tmpFilePath = path.join(TMP_DIR, filename);
  
  try {
    // Try main location first
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(data);
    }
    
    // Try tmp location as fallback
    if (fs.existsSync(tmpFilePath)) {
      const data = await fs.promises.readFile(tmpFilePath, 'utf8');
      return JSON.parse(data);
    }
    
    console.log(`File ${filename} doesn't exist, returning empty array`);
    return []; // Return empty array for non-existent files
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
async function saveData(filename, data) {
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
      const tmpPath = path.join(TMP_DIR, filename);
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
  getData,
  saveData
};