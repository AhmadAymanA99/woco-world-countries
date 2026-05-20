const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: '../config.env' });

const app = express();

// Trust proxy for rate limiting behind Vercel/reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration - Production ready
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://woco-world-countries.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// i18n middleware
const i18next = require('./config/i18n');
const i18nextMiddleware = require('i18next-http-middleware');
app.use(i18nextMiddleware.handle(i18next));

// MongoDB connection with in-memory fallback (local dev only)
async function connectDB() {
  let isInMemory = false;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully (Atlas)');
  } catch (err) {
    if (process.env.VERCEL) {
      console.error('MongoDB connection failed on Vercel:', err.message);
      throw err;
    }
    console.warn('Atlas connection failed, starting in-memory MongoDB...');
    isInMemory = true;
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({
        instance: { dbName: 'woco', launchTimeout: 60000 },
      });
      const uri = await mongod.getUri();
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully (in-memory)');
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB:', memErr.message);
      process.exit(1);
    }
  }

  // Auto-seed if database is empty (in-memory mode)
  if (isInMemory) {
    const Country = require('./models/Country');
    const count = await Country.countDocuments();
    if (count === 0) {
      console.log('Seeding database with country data...');
      const { allCountries } = require('./seed');
      // Insert in batches to avoid memory issues
      const batchSize = 50;
      for (let i = 0; i < allCountries.length; i += batchSize) {
        await Country.insertMany(allCountries.slice(i, i + batchSize));
      }
      console.log(`Seeded ${allCountries.length} countries`);
    }
  }
}

// Health check routes (no DB required)
app.get('/', (req, res) => {
  res.json({ 
    message: req.t('server.apiRunning'), 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
if (process.env.VERCEL && !process.env.MONGODB_URI) {
  // Vercel without Atlas — serve country data from seed JSON
  const { allCountries } = require('./seed');
  const { localizeCountry } = require('./utils/localizeCountry');

  const pick = (obj, fields) => {
    const result = {};
    for (const f of fields) {
      const parts = f.split('.');
      let v = obj;
      for (const p of parts) if (v) v = v[p];
      if (v !== undefined) result[f] = v;
    }
    return result;
  };

  const sortCountries = (arr, sortBy, sortOrder) => {
    const dir = sortOrder === 'desc' ? -1 : 1;
    const arrCopy = [...arr];
    if (sortBy === 'population') arrCopy.sort((a, b) => dir * ((a.population?.total || 0) - (b.population?.total || 0)));
    else if (sortBy === 'gdp') arrCopy.sort((a, b) => dir * ((a.gdp?.total || 0) - (b.gdp?.total || 0)));
    else if (sortBy === 'continent') arrCopy.sort((a, b) => dir * ((a.continent || '').localeCompare(b.continent || '')) || a.name.localeCompare(b.name));
    else arrCopy.sort((a, b) => dir * a.name.localeCompare(b.name));
    return arrCopy;
  };

  const router = require('express').Router();

  router.get('/', (req, res) => {
    let filtered = [...allCountries];
    if (req.query.continent && req.query.continent !== 'all')
      filtered = filtered.filter(c => c.continent === req.query.continent);
    filtered = sortCountries(filtered, req.query.sortBy, req.query.sortOrder);
    const lang = req.language;
    const result = filtered.map(c => {
      const picked = pick(c, ['_id', 'name', 'code', 'continent', 'flag', 'capital', 'population.total', 'gdp.total']);
      return lang === 'ar' ? localizeCountry(picked, lang) : picked;
    });
    res.json({ countries: result, total: result.length });
  });

  router.get('/search/:query', (req, res) => {
    const q = req.params.query.toLowerCase();
    const matches = allCountries.filter(c =>
      c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    ).slice(0, +(req.query.limit || 20));
    res.json(matches);
  });

  router.get('/meta/continents', (req, res) => {
    res.json([...new Set(allCountries.map(c => c.continent).filter(Boolean))]);
  });

  router.get('/continent/:continent', (req, res) => {
    let filtered = allCountries.filter(c => c.continent === req.params.continent);
    filtered = sortCountries(filtered, req.query.sortBy, req.query.sortOrder);
    const lang = req.language;
    const result = filtered.map(c => {
      const picked = pick(c, ['_id', 'name', 'code', 'continent', 'flag', 'capital', 'population.total', 'gdp.total']);
      return lang === 'ar' ? localizeCountry(picked, lang) : picked;
    });
    res.json({ countries: result, total: result.length });
  });

  router.get('/:identifier', (req, res) => {
    const country = allCountries.find(c => c._id.toString() === req.params.identifier || c.code === req.params.identifier);
    if (!country) return res.status(404).json({ message: 'Country not found' });
    const lang = req.language;
    res.json(lang === 'ar' ? localizeCountry({ ...country }, lang) : country);
  });

  router.post('/compare', (req, res) => {
    const ids = req.body.countryIds || [];
    const compared = allCountries.filter(c => ids.includes(c._id.toString()));
    res.json(compared);
  });

  app.use('/api/countries', router);
  const dbUnavail = (req, res) => res.status(503).json({ message: 'Database not available on serverless' });
  app.use('/api/auth', dbUnavail);
  app.use('/api/users', dbUnavail);
  app.use('/api/stories', dbUnavail);
  app.use('/api/trips', dbUnavail);
  app.use('/api/collections', dbUnavail);
  app.use('/api/social', dbUnavail);
  app.use('/api/analytics', dbUnavail);
  app.use('/api/attractions', dbUnavail);
} else {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/countries', require('./routes/countries'));
  app.use('/api/users', require('./routes/users'));
  app.use('/api/stories', require('./routes/stories'));
  app.use('/api/trips', require('./routes/trips'));
  app.use('/api/collections', require('./routes/collections'));
  app.use('/api/social', require('./routes/social'));
  app.use('/api/analytics', require('./routes/analytics'));
  app.use('/api/attractions', require('./routes/attractions'));
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: req.t('server.somethingWentWrong'),
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: req.t('server.routeNotFound') });
});

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL) {
  // Vercel serverless
  if (process.env.MONGODB_URI) {
    // Atlas configured — try connecting
    connectDB().catch((err) => console.error('Initial DB connection failed:', err.message));
  } else {
    // No Atlas — country data served from seed JSON, user features disabled
    console.log('Running on Vercel without MongoDB, using seed data');
  }
} else {
  // Local dev — connect DB then start listening
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
