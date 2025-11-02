const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const Trip = require('../models/Trip');
const Country = require('../models/Country');
const auth = require('../middleware/auth');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Get user's trips
router.get('/', auth, async (req, res) => {
  try {
    const { status } = req.query;
    let query = { user: req.user._id };
    if (status) query.status = status;

    const trips = await Trip.find(query)
      .populate('countries.country', 'name code flag')
      .sort({ startDate: -1 });

    res.json(trips);
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single trip
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    }).populate('countries.country', 'name code flag continent capital');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create trip
router.post('/', auth, [
  body('title').trim().isLength({ min: 1, max: 200 }),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  body('countries').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, startDate, endDate, countries, budget, status, visibility } = req.body;

    const trip = new Trip({
      user: req.user._id,
      title,
      description,
      startDate,
      endDate,
      countries: countries || [],
      budget: budget || {},
      status: status || 'planned',
      visibility: visibility || 'private'
    });

    await trip.save();
    await trip.populate('countries.country', 'name code flag');

    res.status(201).json(trip);
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update trip
router.put('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    Object.assign(trip, req.body);
    await trip.save();
    await trip.populate('countries.country', 'name code flag');

    res.json(trip);
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete trip
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    await trip.deleteOne();
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add country to trip
router.post('/:id/countries', auth, [
  body('countryId').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const trip = await Trip.findOne({ 
      _id: req.params.id,
      user: req.user._id 
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const country = await Country.findById(req.body.countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    trip.countries.push({
      country: req.body.countryId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      notes: req.body.notes,
      budget: req.body.budget,
      currency: req.body.currency || 'USD'
    });

    await trip.save();
    await trip.populate('countries.country', 'name code flag');

    res.json(trip);
  } catch (error) {
    console.error('Add country to trip error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

