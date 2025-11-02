const express = require('express');
const Country = require('../models/Country');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all countries with sorting options
router.get('/', async (req, res) => {
  try {
    const { continent, sortBy = 'name', sortOrder = 'asc', search } = req.query;
    
    let query = {};
    
    // Filter by continent
    if (continent && continent !== 'all') {
      query.continent = continent;
    }
    
    // Search functionality
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Sort options
    let sortOptions = {};
    if (sortBy === 'continent') {
      sortOptions.continent = sortOrder === 'desc' ? -1 : 1;
      sortOptions.name = 1; // Secondary sort by name
    } else if (sortBy === 'population') {
      sortOptions['population.total'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'gdp') {
      sortOptions['gdp.total'] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions.name = sortOrder === 'desc' ? -1 : 1;
    }
    
    const countries = await Country.find(query)
      .select('name code continent flag capital population.total gdp.total')
      .sort(sortOptions);
    
    res.json({
      countries,
      total: countries.length
    });
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single country by ID or code
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    let country;
    
    // Try to find by ID first, then by code
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      country = await Country.findById(identifier);
    } else {
      country = await Country.findOne({ 
        $or: [
          { code: identifier.toUpperCase() },
          { name: { $regex: new RegExp(`^${identifier}$`, 'i') } }
        ]
      });
    }
    
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    res.json(country);
  } catch (error) {
    console.error('Get country error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get countries by continent
router.get('/continent/:continent', async (req, res) => {
  try {
    const { continent } = req.params;
    const { sortBy = 'name', sortOrder = 'asc' } = req.query;
    
    let sortOptions = {};
    if (sortBy === 'population') {
      sortOptions['population.total'] = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'gdp') {
      sortOptions['gdp.total'] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions.name = sortOrder === 'desc' ? -1 : 1;
    }
    
    const countries = await Country.find({ continent })
      .select('name code continent flag capital population.total gdp.total')
      .sort(sortOptions);
    
    res.json({
      countries,
      total: countries.length,
      continent
    });
  } catch (error) {
    console.error('Get countries by continent error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get continents list
router.get('/meta/continents', async (req, res) => {
  try {
    const continents = await Country.distinct('continent');
    res.json(continents.sort());
  } catch (error) {
    console.error('Get continents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search countries
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 20 } = req.query;
    
    const countries = await Country.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { capital: { $regex: query, $options: 'i' } },
        { code: { $regex: query, $options: 'i' } }
      ]
    })
    .select('name code continent flag capital population.total gdp.total')
    .limit(parseInt(limit))
    .sort({ name: 1 });
    
    res.json({
      countries,
      total: countries.length,
      query
    });
  } catch (error) {
    console.error('Search countries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Compare countries
router.post('/compare', async (req, res) => {
  try {
    const { countryIds } = req.body;
    
    if (!Array.isArray(countryIds) || countryIds.length < 2 || countryIds.length > 4) {
      return res.status(400).json({ message: 'Please provide 2-4 country IDs' });
    }
    
    const countries = await Country.find({
      _id: { $in: countryIds }
    });
    
    if (countries.length !== countryIds.length) {
      return res.status(404).json({ message: 'Some countries not found' });
    }
    
    res.json(countries);
  } catch (error) {
    console.error('Compare countries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
