const fs = require('fs');

// Load both translation files
const enPath = 'D:\\new\\woco\\locales\\en\\translation.json';
const arPath = 'D:\\new\\woco\\locales\\ar\\translation.json';

let en = {};
let ar = {};

try {
  en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  console.log(`Loaded English translation from ${enPath}`);
} catch (error) {
  console.error(`Error loading English translation: ${error.message}`);
  process.exit(1);
}

try {
  ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  console.log(`Loaded Arabic translation from ${arPath}`);
} catch (error) {
  console.error(`Error loading Arabic translation: ${error.message}`);
  process.exit(1);
}

// Function to get a nested value from an object using dot notation
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : undefined), obj);
}

// Function to set a nested value in an object using dot notation
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

// Function to recursively collect all key paths from an object
function getAllKeyPaths(obj, prefix = '') {
  const paths = [];
  
  for (const key in obj) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    
    if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      paths.push(...getAllKeyPaths(obj[key], fullPath));
    } else {
      paths.push(fullPath);
    }
  }
  
  return paths;
}

// Get all key paths from English translation
const enPaths = getAllKeyPaths(en);
console.log(`Found ${enPaths.length} keys in English translation`);

// Find missing keys in Arabic translation
const missingPaths = [];
enPaths.forEach(path => {
  if (getNestedValue(ar, path) === undefined) {
    missingPaths.push(path);
  }
});

console.log(`Found ${missingPaths.length} missing keys in Arabic translation`);

// Add missing keys to Arabic translation with English values as placeholders
if (missingPaths.length > 0) {
  console.log('\nAdding missing keys to Arabic translation...');
  
  missingPaths.forEach(path => {
    const value = getNestedValue(en, path);
    if (value !== undefined) {
      setNestedValue(ar, path, value);
    }
  });
  
  // Write updated Arabic translation
  try {
    fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
    console.log(`Successfully updated ${arPath} with ${missingPaths.length} missing keys`);
  } catch (error) {
    console.error(`Error writing Arabic translation: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log('\nAll keys are already present in Arabic translation!');
}

// Also check for extra keys in Arabic that aren't in English (optional cleanup)
const arPaths = getAllKeyPaths(ar);
const extraPaths = [];
arPaths.forEach(path => {
  if (getNestedValue(en, path) === undefined) {
    extraPaths.push(path);
  }
});

if (extraPaths.length > 0) {
  console.log(`\nFound ${extraPaths.length} extra keys in Arabic translation that aren't in English:`);
  extraPaths.forEach(path => console.log(`  ${path}`));
  console.log('These keys will be preserved in the Arabic translation.');
}

console.log('\nTranslation update complete!');