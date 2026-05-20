const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const Country = mongoose.model('Country', require('./client/models/Country').schema);

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const all = await Country.find({}).lean();
  const cleaned = all.map(({ _id, __v, ...rest }) => rest);

  const data = JSON.stringify(cleaned, null, 2);

  const content = `const mongoose = require('mongoose');
const Country = require('./models/Country');
require('dotenv').config({ path: './config.env' });

const allCountries = ${data};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await Country.deleteMany({});
    const batchSize = 50;
    for (let i = 0; i < allCountries.length; i += batchSize) {
      await Country.insertMany(allCountries.slice(i, i + batchSize));
    }
    console.log('Seeded ' + allCountries.length + ' countries');
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

module.exports = { allCountries };

if (require.main === module) {
  seedDatabase();
}
`;

  fs.writeFileSync(path.join(__dirname, 'client', 'seed.js'), content);
  console.log('Written', cleaned.length, 'countries to client/seed.js');
  await mongoose.disconnect();
})();
