const express = require('express');
const User = require('../models/User');
const Country = require('../models/Country');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user travel statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('visitedCountries.country', 'name code flag continent geographicLocation');

    const visitedCountries = user.visitedCountries;

    // Basic stats
    const totalCountries = visitedCountries.length;
    const totalPhotos = visitedCountries.reduce((sum, v) => sum + (v.photos?.length || 0), 0);
    const averageRating = visitedCountries.length > 0
      ? visitedCountries.reduce((sum, v) => sum + (v.rating || 0), 0) / visitedCountries.length
      : 0;

    // Countries by continent
    const byContinent = {};
    visitedCountries.forEach(visit => {
      const continent = visit.country.continent;
      if (!byContinent[continent]) {
        byContinent[continent] = 0;
      }
      byContinent[continent]++;
    });

    // Travel timeline
    const timeline = visitedCountries
      .map(v => ({
        date: v.visitDate,
        country: v.country.name,
        countryId: v.country._id,
        flag: v.country.flag,
        rating: v.rating
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    visitedCountries.forEach(v => {
      if (v.rating) {
        ratingDistribution[v.rating]++;
      }
    });

    // Most visited cities
    const cityFrequency = {};
    visitedCountries.forEach(v => {
      if (v.cities) {
        v.cities.forEach(city => {
          cityFrequency[city] = (cityFrequency[city] || 0) + 1;
        });
      }
    });
    const topCities = Object.entries(cityFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([city, count]) => ({ city, count }));

    // Total days traveled
    const totalDays = visitedCountries.reduce((sum, v) => sum + (v.duration || 0), 0);

    // Map coordinates for all visited countries
    const mapData = visitedCountries
      .filter(v => v.country.geographicLocation?.coordinates)
      .map(v => ({
        country: v.country.name,
        countryId: v.country._id,
        flag: v.country.flag,
        lat: v.country.geographicLocation.coordinates.latitude,
        lng: v.country.geographicLocation.coordinates.longitude,
        visitDate: v.visitDate
      }));

    res.json({
      overview: {
        totalCountries,
        totalPhotos,
        averageRating: averageRating.toFixed(1),
        totalDays,
        continentsVisited: Object.keys(byContinent).length
      },
      byContinent,
      timeline,
      ratingDistribution,
      topCities,
      mapData
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export data as JSON
router.get('/export', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('visitedCountries.country')
      .populate('wishlist')
      .select('username email firstName lastName visitedCountries wishlist preferences');

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="woco-data-${Date.now()}.json"`);
    res.json(user);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

