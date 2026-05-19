const express = require('express');
const User = require('../models/User');
const Country = require('../models/Country');
const auth = require('../middleware/auth');
const { localizeCountry } = require('../utils/localizeCountry');

const router = express.Router();

// Get user travel statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('visitedCountries.country', 'name code flag continent geographicLocation');

    // Localize visited countries data
    const localizedVisitedCountries = user.visitedCountries.map(visit => {
      if (visit.country) {
        // Create a localized copy of the country data
        const localizedCountry = localizeCountry(visit.country.toObject ? visit.country.toObject() : visit.country, req.language);
        return {
          ...visit,
          country: localizedCountry
        };
      }
      return visit;
    });

    // Basic stats
    const totalCountries = localizedVisitedCountries.length;
    const totalPhotos = localizedVisitedCountries.reduce((sum, v) => sum + (v.photos?.length || 0), 0);
    const averageRating = localizedVisitedCountries.length > 0
      ? localizedVisitedCountries.reduce((sum, v) => sum + (v.rating || 0), 0) / localizedVisitedCountries.length
      : 0;

    // Countries by continent
    const byContinent = {};
    localizedVisitedCountries.forEach(visit => {
      const continent = visit.country.continent;
      if (!byContinent[continent]) {
        byContinent[continent] = 0;
      }
      byContinent[continent]++;
    });

    // Travel timeline
    const timeline = localizedVisitedCountries
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
    localizedVisitedCountries.forEach(v => {
      if (v.rating) {
        ratingDistribution[v.rating]++;
      }
    });

    // Most visited cities
    const cityFrequency = {};
    localizedVisitedCountries.forEach(v => {
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
    const totalDays = localizedVisitedCountries.reduce((sum, v) => sum + (v.duration || 0), 0);

    // Map coordinates for all visited countries
    const mapData = localizedVisitedCountries
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
    res.status(500).json({ message: req.t('analytics.serverError') });
  }
});

// Export data as JSON
router.get('/export', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('visitedCountries.country')
      .populate('wishlist')
      .select('username email firstName lastName visitedCountries wishlist preferences');

    // Localize country data in visitedCountries and wishlist for export
    const localizedUser = user.toObject ? user.toObject() : user;
    
    if (localizedUser.visitedCountries && Array.isArray(localizedUser.visitedCountries)) {
      localizedUser.visitedCountries = localizedUser.visitedCountries.map(visit => {
        if (visit.country) {
          // Create a localized copy of the country data
          visit.country = localizeCountry(visit.country.toObject ? visit.country.toObject() : visit.country, req.language);
        }
        return visit;
      });
    }
    
    if (localizedUser.wishlist && Array.isArray(localizedUser.wishlist)) {
      localizedUser.wishlist = localizedUser.wishlist.map(country => {
        if (country) {
          // Create a localized copy of the country data
          return localizeCountry(country.toObject ? country.toObject() : country, req.language);
        }
        return country;
      });
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="woco-data-${Date.now()}.json"`);
    res.json(localizedUser);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: req.t('analytics.serverError') });
  }
});

module.exports = router;

