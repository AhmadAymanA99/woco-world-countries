// Prevent Node 18+ from crashing on unhandled rejections (e.g. i18n async init)
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection (caught):', reason);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: require('path').join(__dirname, '..', 'config.env'), silent: true });

const app = express();

app.set('trust proxy', 1);

// CORS — allow any origin (Vercel handles same-origin routing)
const allowedOrigins = [
  'http://localhost:3000',
  'https://woco-world-countries.vercel.app',
  process.env.VERCEL_URL && 'https://' + process.env.VERCEL_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(null, true); // allow all in dev
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
if (!process.env.VERCEL) app.use(limiter);

// i18n middleware (with fallback if init fails)
let i18next;
try {
  i18next = require('./config/i18n');
  if (i18next.initPromise) i18next.initPromise.catch(() => {});
  const i18nextMiddleware = require('i18next-http-middleware');
  app.use(i18nextMiddleware.handle(i18next));
} catch (err) {
  console.error('i18n init failed:', err.message);
}

// Middleware to set req.t fallback when i18n is not available
app.use((req, res, next) => {
  if (!req.t) req.t = (key) => key;
  next();
});

// Health check routes (no DB required, before any async init)
app.get('/', (req, res) => {
  res.json({ message: req.t('server.apiRunning'), status: 'healthy', timestamp: new Date().toISOString() });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ——— DATA LAYER ———
// Decide at module-load time whether we have a database.
// On Vercel without MONGODB_URI we use seed-data fallback;
// on Vercel WITH MONGODB_URI we use Atlas.
// Locally we always connect DB before listening.

const useSeedFallback = process.env.VERCEL ? !process.env.MONGODB_URI : false;
let dbReady = false;
let dbError = null;
let dbConnectionPromise = null;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully (Atlas)');
    dbReady = true;
  } catch (err) {
    dbError = err.message;
    if (process.env.VERCEL) {
      console.error('MongoDB connection failed on Vercel:', err.message);
      return; // don't throw, just mark unavailable
    }
    console.warn('Atlas connection failed, starting in-memory MongoDB...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create({
        instance: { dbName: 'woco', launchTimeout: 60000 },
      });
      const uri = await mongod.getUri();
      await mongoose.connect(uri);
      console.log('MongoDB connected successfully (in-memory)');
      dbReady = true;
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB:', memErr.message);
      dbError = memErr.message;
    }
  }

  if (dbReady) {
    try {
      const Country = require('./models/Country');
      const count = await Country.countDocuments();
      if (count === 0) {
        console.log('Seeding database with country data...');
        const { allCountries } = require('./seed');
        const batchSize = 50;
        for (let i = 0; i < allCountries.length; i += batchSize) {
          await Country.insertMany(allCountries.slice(i, i + batchSize));
        }
        console.log(`Seeded ${allCountries.length} countries`);
      }
    } catch (seedErr) {
      console.error('Auto-seed failed:', seedErr.message);
    }
  }
}

// Middleware to wait for DB connection on non-seed routes
app.use(async (req, res, next) => {
  if (useSeedFallback) return next();
  if (dbReady) return next();
  try {
    if (!dbConnectionPromise) dbConnectionPromise = connectDB();
    await dbConnectionPromise;
  } catch (e) {
    dbError = e.message;
  }
  next();
});

// ——— ROUTES ———
if (useSeedFallback) {
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
      return localizeCountry(picked, lang);
    });
    res.json({ countries: result, total: result.length });
  });

  router.get('/search/:query', (req, res) => {
    const q = req.params.query.toLowerCase();
    const lang = req.language;
    const matches = allCountries.filter(c =>
      c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    ).slice(0, +(req.query.limit || 20));
    res.json({ countries: matches.map(c => localizeCountry(c, lang)), total: matches.length });
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
      return localizeCountry(picked, lang);
    });
    res.json({ countries: result, total: result.length });
  });

  router.get('/:identifier', (req, res) => {
    const country = allCountries.find(c => c._id.toString() === req.params.identifier || c.code === req.params.identifier);
    if (!country) return res.status(404).json({ message: 'Country not found' });
    const lang = req.language;
    res.json(localizeCountry({ ...country }, lang));
  });

  router.post('/compare', (req, res) => {
    const ids = req.body.countryIds || [];
    const compared = allCountries.filter(c => ids.includes(c._id.toString()));
    const lang = req.language;
    res.json(compared.map(c => localizeCountry({ ...c }, lang)));
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

// DB-status middleware (injects dbReady/dbError for routes that need it)
app.use((req, res, next) => {
  req.dbReady = dbReady;
  req.dbError = dbError;
  next();
});

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
  if (process.env.MONGODB_URI) {
    dbConnectionPromise = connectDB();
  } else {
    console.log('Running on Vercel without MongoDB, using seed data');
  }
} else {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
