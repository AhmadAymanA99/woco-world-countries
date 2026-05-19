const fs = require('fs');
const ar = JSON.parse(fs.readFileSync('D:\\new\\woco\\locales\\ar\\translation.json', 'utf8'));

// Translation keys used in CountryDetail.js
const keys = [
  'common.cancel',
  'countries.addToWishlist',
  'countryDetail.activities',
  'countryDetail.activitiesPlaceholder',
  'countryDetail.addedToVisited',
  'countryDetail.addedToWishlist',
  'countryDetail.adding',
  'countryDetail.additionalInfo',
  'countryDetail.addVisit',
  'countryDetail.admissionFee',
  'countryDetail.agriculture',
  'countryDetail.allCategories',
  'countryDetail.annually',
  'countryDetail.area',
  'countryDetail.audioUnsupported',
  'countryDetail.backToCountries',
  'countryDetail.borders',
  'countryDetail.category',
  'countryDetail.citiesPlaceholder',
  'countryDetail.citiesVisited',
  'countryDetail.climate',
  'countryDetail.coastline',
  'countryDetail.coordinates',
  'countryDetail.currency',
  'countryDetail.density',
  'countryDetail.economicSectors',
  'countryDetail.gdp',
  'countryDetail.gdpPerCapita',
  'countryDetail.geographicLocation',
  'countryDetail.government',
  'countryDetail.growthRate',
  'countryDetail.independence',
  'countryDetail.industry',
  'countryDetail.inWishlist',
  'countryDetail.km',
  'countryDetail.languages',
  'countryDetail.listView',
  'countryDetail.location',
  'countryDetail.map',
  'countryDetail.markVisited',
  'countryDetail.nationalAnthem',
  'countryDetail.nationalDay',
  'countryDetail.noAttractions',
  'countryDetail.notes',
  'countryDetail.notesPlaceholder',
  'countryDetail.notFound',
  'countryDetail.openingHours',
  'countryDetail.openInGoogleMaps',
  'countryDetail.peoplePerKm',
  'countryDetail.population',
  'countryDetail.rating',
  'countryDetail.religions',
  'countryDetail.removedFromWishlist',
  'countryDetail.services',
  'countryDetail.sqKm',
  'countryDetail.timezone',
  'countryDetail.totalGdp',
  'countryDetail.totalPopulation',
  'countryDetail.touristAttractions',
  'countryDetail.traditions',
  'countryDetail.urbanPopulation',
  'countryDetail.visitDate',
  'countryDetail.visitedAddError',
  'countryDetail.visitWebsite',
  'countryDetail.website',
  'countryDetail.wishlistAddError',
  'countryDetail.wishlistRemoveError'
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

console.log('Missing keys in Arabic translation:');
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