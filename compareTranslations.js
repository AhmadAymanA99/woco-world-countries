const fs = require('fs');
const en = JSON.parse(fs.readFileSync('D:\\new\\woco\\locales\\en\\translation.json', 'utf8'));
const ar = JSON.parse(fs.readFileSync('D:\\new\\woco\\locales\\ar\\translation.json', 'utf8'));

function findMissingKeys(obj1, obj2, path = '') {
  let missing = [];
  for (let key in obj1) {
    const fullPath = path ? path + '.' + key : key;
    if (!(key in obj2)) {
      missing.push(fullPath);
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
      missing = missing.concat(findMissingKeys(obj1[key], obj2[key], fullPath));
    }
  }
  return missing;
}

const missing = findMissingKeys(en, ar);
console.log('Missing keys in Arabic translation:');
missing.forEach(key => console.log('  ' + key));
console.log('Total missing: ' + missing.length);

// Find keys that exist in Arabic but not in English
const extraInAr = findMissingKeys(ar, en);
console.log('\nExtra keys in Arabic translation:');
extraInAr.forEach(key => console.log('  ' + key));
console.log('Total extra in Arabic: ' + extraInAr.length);