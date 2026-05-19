const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const Country = require('../models/Country');
const auth = require('../middleware/auth');
const { localizeCountry } = require('../utils/localizeCountry');

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
      cb(new Error(req.t('validation.imageFilesOnly')), false);
    }
  }
});

// Get attractions for a country
router.get('/country/:countryId', async (req, res) => {
  try {
    const country = await Country.findById(req.params.countryId)
      .select('touristAttractions name code');
    
    if (!country) {
      return res.status(404).json({ message: req.t('attractions.countryNotFound') });
    }
    
    // Localize the country data
    const localizedCountry = localizeCountry(country, req.language);
    
    res.json({
      country: localizedCountry.name,
      code: localizedCountry.code,
      attractions: localizedCountry.touristAttractions || []
    });
  } catch (error) {
    console.error('Get attractions error:', error);
    res.status(500).json({ message: req.t('attractions.serverError') });
  }
});

// Add attraction to country
router.post('/country/:countryId', auth, [
  body('name').trim().isLength({ min: 1, max: 200 }),
  body('description').optional().isString(),
  body('location').optional().isString(),
  body('latitude').optional().isFloat(),
  body('longitude').optional().isFloat(),
  body('category').optional().isIn(['historical', 'natural', 'cultural', 'religious', 'adventure', 'beach', 'mountain', 'city', 'other']),
  body('rating').optional().isInt({ min: 1, max: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const country = await Country.findById(req.params.countryId);
    if (!country) {
      return res.status(404).json({ message: req.t('attractions.countryNotFound') });
    }

    const { name, description, location, latitude, longitude, category, rating, openingHours, admissionFee, website } = req.body;

    const attraction = {
      name,
      description,
      location,
      category,
      rating,
      openingHours,
      admissionFee,
      website,
      images: []
    };

    if (latitude && longitude) {
      attraction.coordinates = { latitude, longitude };
    }

    country.touristAttractions.push(attraction);
    await country.save();

    res.status(201).json({
      message: req.t('attractions.added'),
      attraction: country.touristAttractions[country.touristAttractions.length - 1]
    });
  } catch (error) {
    console.error('Add attraction error:', error);
    res.status(500).json({ message: req.t('attractions.serverError') });
  }
});

// Update attraction
router.put('/country/:countryId/attraction/:attractionIndex', auth, async (req, res) => {
  try {
    const country = await Country.findById(req.params.countryId);
    if (!country) {
      return res.status(404).json({ message: req.t('attractions.countryNotFound') });
    }

    const attractionIndex = parseInt(req.params.attractionIndex);
    if (attractionIndex < 0 || attractionIndex >= country.touristAttractions.length) {
      return res.status(404).json({ message: req.t('attractions.notFound') });
    }

    Object.assign(country.touristAttractions[attractionIndex], req.body);
    await country.save();

    res.json({
      message: req.t('attractions.updated'),
      attraction: country.touristAttractions[attractionIndex]
    });
  } catch (error) {
    console.error('Update attraction error:', error);
    res.status(500).json({ message: req.t('attractions.serverError') });
  }
});

// Delete attraction
router.delete('/country/:countryId/attraction/:attractionIndex', auth, async (req, res) => {
  try {
    const country = await Country.findById(req.params.countryId);
    if (!country) {
      return res.status(404).json({ message: req.t('attractions.countryNotFound') });
    }

    const attractionIndex = parseInt(req.params.attractionIndex);
    if (attractionIndex < 0 || attractionIndex >= country.touristAttractions.length) {
      return res.status(404).json({ message: req.t('attractions.notFound') });
    }

    country.touristAttractions.splice(attractionIndex, 1);
    await country.save();

    res.json({ message: req.t('attractions.deleted') });
  } catch (error) {
    console.error('Delete attraction error:', error);
    res.status(500).json({ message: req.t('attractions.serverError') });
  }
});

// Add image to attraction
router.post('/country/:countryId/attraction/:attractionIndex/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: req.t('attractions.noImage') });
    }

    const country = await Country.findById(req.params.countryId);
    if (!country) {
      return res.status(404).json({ message: req.t('attractions.countryNotFound') });
    }

    const attractionIndex = parseInt(req.params.attractionIndex);
    if (attractionIndex < 0 || attractionIndex >= country.touristAttractions.length) {
      return res.status(404).json({ message: req.t('attractions.notFound') });
    }

    const attraction = country.touristAttractions[attractionIndex];
    const { caption } = req.body;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: `woco/attractions/${country._id}/${attractionIndex}`,
        transformation: [
          { width: 1200, height: 800, crop: 'fill', quality: 'auto' },
          { format: 'auto' }
        ]
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: req.t('attractions.imageUploadFailed') });
        }

        try {
          attraction.images = attraction.images || [];
          attraction.images.push({
            url: result.secure_url,
            caption: caption || ''
          });

          // Set imageUrl to first image for backward compatibility
          if (!attraction.imageUrl) {
            attraction.imageUrl = result.secure_url;
          }

          await country.save();

          res.status(201).json({
            message: req.t('attractions.imageAdded'),
            image: {
              url: result.secure_url,
              caption: caption || ''
            }
          });
        } catch (error) {
          console.error('Save image error:', error);
          res.status(500).json({ message: req.t('attractions.serverError') });
        }
      }
    );

    require('stream').Readable.from(req.file.buffer).pipe(result);
  } catch (error) {
    console.error('Add image error:', error);
    res.status(500).json({ message: req.t('attractions.serverError') });
  }
});

module.exports = router;

