const https = require('https');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const regions = ['africa', 'americas', 'asia', 'europe', 'oceania'];
const fields = 'name,cca2,flags,continents,capital,languages,currencies,population,area,borders,latlng,timezones,independent,subregion,region,landlocked,idd,startOfWeek,demonyms,fifa,car,maps,coatOfArms,status,unMember';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { reject(e); } });
    }).on('error', reject);
  });
}

function mapCountry(api) {
  const currencies = api.currencies ? Object.keys(api.currencies).map(k => ({
    code: k,
    name: api.currencies[k].name,
    symbol: api.currencies[k].symbol || ''
  })) : [];
  const currencyStr = currencies.map(c => c.name).join(', ');

  return {
    name: api.name?.common || '',
    code: api.cca2 || '',
    continent: api.continents?.[0] || '',
    flag: api.flags?.png || '',
    capital: api.capital?.[0] || '',
    currency: currencyStr,
    languages: api.languages ? Object.values(api.languages) : [],
    timezone: api.timezones || [],
    population: {
      total: api.population || 0,
      density: api.area > 0 ? Math.round(api.population / api.area) : 0,
    },
    geographicLocation: {
      coordinates: {
        latitude: api.latlng?.[0] || 0,
        longitude: api.latlng?.[1] || 0,
      },
      area: api.area || 0,
      borders: api.borders || [],
    },
    independent: api.independent ? 'Yes' : 'No',
    government: api.status || '',
    climate: '',
    anthem: { title: '', audioUrl: '', lyrics: '' },
    gdp: { total: 0, perCapita: 0, growthRate: 0, sectors: { agriculture: 0, industry: 0, services: 0 } },
    religions: [],
    traditions: [],
    touristAttractions: [],
    nationalDay: '',
  };
}

async function reseed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    let CountryModel;
    try { CountryModel = mongoose.model('Country'); } catch (e) {
      CountryModel = mongoose.model('Country', require('./client/models/Country').schema);
    }
    console.log('Connected to MongoDB');

    // Save curated fields from existing data, handle case where collection might not exist
    let curatedMap = {};
    try {
      const existing = await CountryModel.find({}).lean();
      for (const c of existing) {
        curatedMap[c.code] = {
          anthem: c.anthem,
          climate: c.climate,
          gdp: c.gdp,
          religions: c.religions,
          traditions: c.traditions,
          touristAttractions: c.touristAttractions,
          nationalDay: c.nationalDay,
          independence: c.independence,
          government: c.government,
        };
      }
      console.log(`Backed up curated data for ${Object.keys(curatedMap).length} existing countries`);
    } catch (e) {
      console.log('No existing data to back up:', e.message);
    }

    // Fetch fresh data from API
    let allApi = [];
    for (const region of regions) {
      const data = await fetchJson(`https://restcountries.com/v3.1/region/${region}?fields=${fields}`);
      allApi = allApi.concat(data);
      console.log(`Fetched ${data.length} from ${region}`);
    }
    console.log(`Total fresh: ${allApi.length}`);

    // Include UN members + non-UN countries from original 196 (PS, TW, VA, GW)
    const extraCodes = ['PS', 'TW', 'VA', 'GW'];
    const fresh = allApi
      .filter(api => api.unMember === true || extraCodes.includes(api.cca2))
      .map(api => {
      const country = mapCountry(api);
      // Fix Afghanistan flag — use flagcdn (internationally recognized tricolor)
      if (country.code === 'AF') {
        country.flag = 'https://flagcdn.com/w320/af.png';
      }
      // Restore curated fields if they exist
      const curated = curatedMap[country.code];
      if (curated) {
        country.anthem = curated.anthem || country.anthem;
        country.climate = curated.climate || country.climate;
        country.gdp = curated.gdp || country.gdp;
        country.religions = curated.religions || country.religions;
        country.traditions = curated.traditions || country.traditions;
        country.touristAttractions = curated.touristAttractions || country.touristAttractions;
        country.nationalDay = curated.nationalDay || country.nationalDay;
        country.independence = curated.independence || country.independence;
        country.government = curated.government || country.government;
      }
      return country;
    });

    // Replace data
    await db.collection('countries').deleteMany({});
    const batchSize = 50;
    for (let i = 0; i < fresh.length; i += batchSize) {
      await CountryModel.insertMany(fresh.slice(i, i + batchSize));
    }
    console.log(`Inserted ${fresh.length} countries`);
    await mongoose.disconnect();
    console.log('Done');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

reseed();
