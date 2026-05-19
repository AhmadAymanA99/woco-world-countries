const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: './config.env' });

const app = express();

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
        instance: { dbName: 'woco' },
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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/countries', require('./routes/countries'));
app.use('/api/users', require('./routes/users'));
app.use('/api/stories', require('./routes/stories'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/collections', require('./routes/collections'));
app.use('/api/social', require('./routes/social'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/attractions', require('./routes/attractions'));

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
  // Vercel serverless — connect DB on module load (cached for warm lambdas)
  connectDB().catch((err) => console.error('Initial DB connection failed:', err.message));
} else {
  // Local dev — connect DB then start listening
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
