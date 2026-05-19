const fs = require('fs');
const path = require('path');

// Define directories to search
const directories = [
  'D:\\new\\woco\\client\\src\\pages',
  'D:\\new\\woco\\client\\src\\components'
];

// Function to get all .js files in a directory recursively
function getJsFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getJsFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Get all JS files
const files = [];
directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    files.push(...getJsFiles(dir));
  }
});

// Extract all t('...') keys from these files
const keys = new Set();

files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/t\('[^']+'\)/g) || [];
    matches.forEach(match => {
      // Extract the key from t('key')
      const key = match.substring(3, match.length - 2);
      keys.add(key);
    });
  } catch (error) {
    console.error(`Error reading file ${file}: ${error.message}`);
  }
});

console.log(`Found ${keys.size} unique translation keys in client-side code:`);

// Load current Arabic translation
const arPath = 'D:\\new\\woco\\locales\\ar\\translation.json';
let ar = {};
try {
  ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
} catch (error) {
  console.error(`Error reading Arabic translation file: ${error.message}`);
}

// Function to get nested value
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : undefined), obj);
}

// Find missing keys
const missingKeys = [];
keys.forEach(key => {
  if (getNestedValue(ar, key) === undefined) {
    missingKeys.push(key);
  }
});

console.log(`\nMissing keys in Arabic translation: ${missingKeys.length}`);
missingKeys.forEach(key => console.log(`  ${key}`));

if (missingKeys.length > 0) {
  console.log('\nAdding missing keys to Arabic translation...');
  
  // Load English translation for reference values
  const enPath = 'D:\\new\\woco\\locales\\en\\translation.json';
  let en = {};
  try {
    en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  } catch (error) {
    console.error(`Error reading English translation file: ${error.message}`);
  }
  
  // Add missing keys with English values as placeholders
  missingKeys.forEach(key => {
    const value = getNestedValue(en, key);
    if (value !== undefined) {
      const keyParts = key.split('.');
      let current = ar;
      for (let i = 0; i < keyParts.length - 1; i++) {
        if (!current[keyParts[i]]) {
          current[keyParts[i]] = {};
        }
        current = current[keyParts[i]];
      }
      current[keyParts[keyParts.length - 1]] = value;
    }
  });
  
  // Write updated Arabic translation
  try {
    fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
    console.log('Updated Arabic translation file with missing keys.');
  } catch (error) {
    console.error(`Error writing Arabic translation file: ${error.message}`);
  }
} else {
  console.log('\nAll translation keys are present in Arabic translation!');
}