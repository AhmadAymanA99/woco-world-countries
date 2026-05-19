const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('D:\\new\\woco\\locales\\ar\\translation.json', 'utf8'));

// Translation keys used in Countries.js
const keys = [
  'common.billion',
  'common.million',
  'common.thousand',
  'countries.adjustSearch',
  'countries.allContinents',
  'countries.capital',
  'countries.clearSearch',
  'countries.description',
  'countries.noResults',
  'countries.searchPlaceholder',
  'countries.seoDescription',
  'countries.sortContinent',
  'countries.sortGdp',
  'countries.sortName',
  'countries.sortPopulation',
  'countries.title',
  'seo.countriesTitle'
];

function getNestedValue(obj, path) {
  return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : undefined), obj);
}

const missingKeys = [];
keys.forEach(key => {
  if (getNestedValue(ar, key) === undefined) {
    missingKeys.push(key);
  }
});

console.log('Missing keys in Arabic translation (Countries.js):');
missingKeys.forEach(key => console.log(`  ${key}`));
console.log(`Total missing: ${missingKeys.length}`);

if (missingKeys.length > 0) {
  console.log('\nAdding missing keys to Arabic translation...');
  
  // Add missing keys with English values as placeholders
  const en = JSON.parse(fs.readFileSync('D:\\new\\woco\\locales\\en\\translation.json', 'utf8'));
  
  missingKeys.forEach(key => {
    const value = getNestedValue(en, key);
    if (value !== undefined) {
      const keys = key.split('.');
      let current = ar;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    }
  });
  
  fs.writeFileSync('D:\\new\\woco\\locales\\ar\\translation.json', JSON.stringify(ar, null, 2));
  console.log('Updated Arabic translation file with missing keys.');
}