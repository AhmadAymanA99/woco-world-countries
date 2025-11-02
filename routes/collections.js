const express = require('express');
const { body, validationResult } = require('express-validator');
const Collection = require('../models/Collection');
const Country = require('../models/Country');
const auth = require('../middleware/auth');

const router = express.Router();

// Get public collections
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, user } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = { visibility: 'public' };
    if (category) query.category = category;
    if (user) query.user = user;

    const collections = await Collection.find(query)
      .populate('user', 'username firstName lastName avatar')
      .populate('countries', 'name code flag')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Collection.countDocuments(query);

    res.json({ collections, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    console.error('Get collections error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's collections
router.get('/my-collections', auth, async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id })
      .populate('countries', 'name code flag')
      .sort({ createdAt: -1 });

    res.json(collections);
  } catch (error) {
    console.error('Get my collections error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single collection
router.get('/:id', async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('user', 'username firstName lastName avatar bio')
      .populate('countries', 'name code flag continent capital');

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.json(collection);
  } catch (error) {
    console.error('Get collection error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create collection
router.post('/', auth, [
  body('name').trim().isLength({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, countries, category, visibility } = req.body;

    const collection = new Collection({
      user: req.user._id,
      name,
      description,
      countries: countries || [],
      category: category || 'custom',
      visibility: visibility || 'public'
    });

    await collection.save();
    await collection.populate('countries', 'name code flag');

    res.status(201).json(collection);
  } catch (error) {
    console.error('Create collection error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update collection
router.put('/:id', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(collection, req.body);
    await collection.save();
    await collection.populate('countries', 'name code flag');

    res.json(collection);
  } catch (error) {
    console.error('Update collection error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete collection
router.delete('/:id', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await collection.deleteOne();
    res.json({ message: 'Collection deleted' });
  } catch (error) {
    console.error('Delete collection error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add country to collection
router.post('/:id/countries/:countryId', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const country = await Country.findById(req.params.countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    if (!collection.countries.includes(req.params.countryId)) {
      collection.countries.push(req.params.countryId);
      await collection.save();
    }

    await collection.populate('countries', 'name code flag');
    res.json(collection);
  } catch (error) {
    console.error('Add country to collection error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove country from collection
router.delete('/:id/countries/:countryId', auth, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    collection.countries = collection.countries.filter(
      id => id.toString() !== req.params.countryId
    );
    await collection.save();

    await collection.populate('countries', 'name code flag');
    res.json(collection);
  } catch (error) {
    console.error('Remove country from collection error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

