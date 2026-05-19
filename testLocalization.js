const fs = require('fs');
const path = require('path');

// Test data - Barbados from seed.js
const barbados = {
  "_id": "68fd1c0340d28bb3585c95ce",
  "name": "Barbados",
  "code": "BB",
  "continent": "North America",
  "flag": "https://flagcdn.com/w320/bb.png",
  "geographicLocation": {
    "coordinates": {
      "latitude": 13.1939,
      "longitude": -59.5432
    },
    "area": 430,
    "borders": [],
    "coastline": 97
  },
  "population": {
    "total": 287375,
    "density": 668,
    "growthRate": 0.2,
    "urbanPopulation": 31.2
  },
  "gdp": {
    "total": 5000000000,
    "perCapita": 17391,
    "growthRate": 0,
    "sectors": {
      "agriculture": 1.5,
      "industry": 11.9,
      "services": 86.6
    }
  },
  "religions": [
    {
      "name": "Christianity",
      "percentage": 75.6,
      "_id": "68fd1c0340d28bb3585c95cf"
    },
    {
      "name": "Other",
      "percentage": 24.4,
      "_id": "68fd1c0340d28bb3585c95d0"
    }
  ],
  "traditions": [
    {
      "name": "Independence Day",
      "description": "National celebration",
      "category": "festival",
      "_id": "68fd1c0340d28bb3585c95d1"
    }
  ],
  "touristAttractions": [
    {
      "name": "Historic Bridgetown",
      "description": "UNESCO World Heritage site",
      "location": "Bridgetown",
      "category": "cultural",
      "rating": 4,
      "_id": "68fd1c0340d28bb3585c95d2"
    }
  ],
  "capital": "Bridgetown",
  "currency": "Barbadian Dollar (BBD)",
  "languages": [
    "English"
  ],
  "timezone": [
    "UTC-4"
  ],
  "climate": "Tropical",
  "government": "Parliamentary constitutional monarchy",
  "independence": "November 30, 1966",
  "nationalDay": "November 30"
};

console.log('Testing localization of Barbados data:');
console.log('====================================');

// Load the localizeCountry function directly
const localizeCountry = require('./utils/localizeCountry').localizeCountry;

// Test with English (should return original)
const englishResult = localizeCountry(barbados, 'en');
console.log('English result:');
console.log(`- Name: ${englishResult.name}`);
console.log(`- Continent: ${englishResult.continent}`);
console.log(`- Capital: ${englishResult.capital}`);
console.log(`- Currency: ${englishResult.currency}`);
console.log(`- Climate: ${englishResult.climate}`);
console.log(`- Government: ${englishResult.government}`);
console.log(`- Languages: ${englishResult.languages.join(', ')}`);
console.log(`- Religions: ${englishResult.religions.map(r => `${r.name}: ${r.percentage}%`).join(', ')}`);
console.log(`- Traditions: ${englishResult.traditions.map(t => `${t.name} (${t.category})`).join(', ')}`);
console.log(`- Attractions: ${englishResult.touristAttractions.map(a => `${a.name} (${a.category})`).join(', ')}`);
console.log();

// Test with Arabic (should return translated)
const arabicResult = localizeCountry(barbados, 'ar');
console.log('Arabic result:');
console.log(`- Name: ${arabicResult.name}`);
console.log(`- Continent: ${arabicResult.continent}`);
console.log(`- Capital: ${arabicResult.capital}`);
console.log(`- Currency: ${arabicResult.currency}`);
console.log(`- Climate: ${arabicResult.climate}`);
console.log(`- Government: ${arabicResult.government}`);
console.log(`- Languages: ${arabicResult.languages.join(', ')}`);
console.log(`- Religions: ${arabicResult.religions.map(r => `${r.name}: ${r.percentage}%`).join(', ')}`);
console.log(`- Traditions: ${arabicResult.traditions.map(t => `${t.name} (${t.category})`).join(', ')}`);
console.log(`- Attractions: ${arabicResult.touristAttractions.map(a => `${a.name} (${a.category})`).join(', ')}`);
console.log(`- Independence: ${arabicResult.independence}`);
console.log(`- National Day: ${arabicResult.nationalDay}`);

// Check if translation worked correctly
const checks = [
  { field: 'name', expected: 'بربادوس', actual: arabicResult.name },
  { field: 'continent', expected: 'أمريكا الشمالية', actual: arabicResult.continent },
  { field: 'capital', expected: 'بريدج تاون', actual: arabicResult.capital },
  { field: 'currency', expected: 'دولار بربادوسي (BBD)', actual: arabicResult.currency },
  { field: 'climate', expected: 'استوائي', actual: arabicResult.climate },
  { field: 'government', expected: 'ملكية دستورية برلمانية', actual: arabicResult.government },
  { field: 'languages', expected: ['الإنجليزية'], actual: arabicResult.languages },
  { field: 'religion1', expected: 'المسيحية', actual: arabicResult.religions[0].name },
  { field: 'religion2', expected: 'أخرى', actual: arabicResult.religions[1].name },
  { field: 'traditionCategory', expected: 'مهرجان', actual: arabicResult.traditions[0].category },
  { field: 'attractionCategory', expected: 'ثقافي', actual: arabicResult.touristAttractions[0].category }
];

console.log('\\nValidation checks:');
console.log('==================');
let allPassed = true;
checks.forEach(check => {
  const passed = JSON.stringify(check.expected) === JSON.stringify(check.actual);
  if (!passed) allPassed = false;
  console.log(`${passed ? '✓' : '✗'} ${check.field}: expected '${check.expected}', got '${check.actual}'`);
});

if (allPassed) {
  console.log('\\nAll localization checks passed!');
} else {
  console.log('\\nSome localization checks failed!');
}