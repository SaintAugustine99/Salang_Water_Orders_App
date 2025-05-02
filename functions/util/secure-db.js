// functions/util/secure-db.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Secret key stored as environment variable (set in Netlify dashboard)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'fallback-dev-key-change-in-production';

const DATA_DIR = path.join(__dirname, '..', '..', '.data');

// Encrypt data before storing
function encryptData(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(JSON.stringify(data));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt data after retrieving
function decryptData(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}

// Save data securely
async function saveData(filename, data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  const filePath = path.join(DATA_DIR, filename);
  const encryptedData = encryptData(data);
  
  try {
    await fs.promises.writeFile(filePath, encryptedData, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
    return false;
  }
}

// Get data securely
async function getData(filename) {
  const filePath = path.join(DATA_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  try {
    const encryptedData = await fs.promises.readFile(filePath, 'utf8');
    return decryptData(encryptedData);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

module.exports = {
  saveData,
  getData
};