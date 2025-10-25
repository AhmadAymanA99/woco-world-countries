const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Country = require('../models/Country');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Get user's visited countries
router.get('/visited-countries', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('visitedCountries.country', 'name code flag continent capital')
      .select('visitedCountries');
    
    res.json(user.visitedCountries);
  } catch (error) {
    console.error('Get visited countries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add country to visited list
router.post('/visited-countries', auth, [
  body('countryId').isMongoId().withMessage('Valid country ID is required'),
  body('visitDate').isISO8601().withMessage('Valid visit date is required'),
  body('duration').optional().custom((value) => {
    if (value === '' || value === null || value === undefined) return true;
    return !isNaN(value) && isFinite(value);
  }).withMessage('Duration must be a number'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('notes').optional().isString(),
  body('cities').optional().isArray(),
  body('activities').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { countryId, visitDate, duration, notes, rating, cities, activities } = req.body;

    // Verify country exists
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Add to visited countries
    await req.user.addVisitedCountry(countryId, {
      visitDate,
      duration,
      notes,
      rating,
      cities,
      activities
    });

    const updatedUser = await User.findById(req.user._id)
      .populate('visitedCountries.country', 'name code flag continent capital')
      .select('visitedCountries');

    res.status(201).json({
      message: 'Country added to visited list',
      visitedCountries: updatedUser.visitedCountries
    });
  } catch (error) {
    console.error('Add visited country error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update visited country
router.put('/visited-countries/:countryId', auth, [
  body('visitDate').optional().isISO8601().withMessage('Valid visit date is required'),
  body('duration').optional().custom((value) => {
    if (value === '' || value === null || value === undefined) return true;
    return !isNaN(value) && isFinite(value);
  }).withMessage('Duration must be a number'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('notes').optional().isString(),
  body('cities').optional().isArray(),
  body('activities').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { countryId } = req.params;
    const updateData = req.body;

    const user = await User.findById(req.user._id);
    const visitIndex = user.visitedCountries.findIndex(
      visit => visit.country.toString() === countryId
    );

    if (visitIndex === -1) {
      return res.status(404).json({ message: 'Visit record not found' });
    }

    // Update the visit record
    Object.assign(user.visitedCountries[visitIndex], updateData);
    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate('visitedCountries.country', 'name code flag continent capital')
      .select('visitedCountries');

    res.json({
      message: 'Visit record updated',
      visitedCountries: updatedUser.visitedCountries
    });
  } catch (error) {
    console.error('Update visited country error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove country from visited list
router.delete('/visited-countries/:countryId', auth, async (req, res) => {
  try {
    const { countryId } = req.params;

    const user = await User.findById(req.user._id);
    user.visitedCountries = user.visitedCountries.filter(
      visit => visit.country.toString() !== countryId
    );
    await user.save();

    res.json({ message: 'Country removed from visited list' });
  } catch (error) {
    console.error('Remove visited country error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload photo for visited country
router.post('/visited-countries/:countryId/photos', auth, upload.single('photo'), async (req, res) => {
  try {
    const { countryId } = req.params;
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    const user = await User.findById(req.user._id);
    const visit = user.visitedCountries.find(
      visit => visit.country.toString() === countryId
    );

    if (!visit) {
      return res.status(404).json({ message: 'Visit record not found' });
    }

    if (visit.photos.length >= 10) {
      return res.status(400).json({ message: 'Maximum 10 photos allowed per country' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: `woco/users/${user._id}/photos`,
        transformation: [
          { width: 1200, height: 800, crop: 'fill', quality: 'auto' },
          { format: 'auto' }
        ]
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Photo upload failed' });
        }

        try {
          // Add photo to visit record
          await user.addPhotoToVisit(countryId, {
            url: result.secure_url,
            caption: caption || '',
            uploadDate: new Date()
          });

          const updatedUser = await User.findById(req.user._id)
            .populate('visitedCountries.country', 'name code flag continent capital')
            .select('visitedCountries');

          res.status(201).json({
            message: 'Photo uploaded successfully',
            photo: {
              url: result.secure_url,
              caption: caption || '',
              uploadDate: new Date()
            },
            visitedCountries: updatedUser.visitedCountries
          });
        } catch (error) {
          console.error('Add photo error:', error);
          res.status(500).json({ message: 'Server error' });
        }
      }
    );

    // Send the buffer to Cloudinary
    require('stream').Readable.from(req.file.buffer).pipe(result);
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete photo from visited country
router.delete('/visited-countries/:countryId/photos/:photoIndex', auth, async (req, res) => {
  try {
    const { countryId, photoIndex } = req.params;
    const photoIdx = parseInt(photoIndex);

    if (isNaN(photoIdx) || photoIdx < 0) {
      return res.status(400).json({ message: 'Invalid photo index' });
    }

    const user = await User.findById(req.user._id);
    const visit = user.visitedCountries.find(
      visit => visit.country.toString() === countryId
    );

    if (!visit) {
      return res.status(404).json({ message: 'Visit record not found' });
    }

    if (photoIdx >= visit.photos.length) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Remove photo from array
    visit.photos.splice(photoIdx, 1);
    await user.save();

    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's wishlist
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist', 'name code flag continent capital')
      .select('wishlist');
    
    res.json(user.wishlist);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add country to wishlist
router.post('/wishlist/:countryId', auth, async (req, res) => {
  try {
    const { countryId } = req.params;

    // Verify country exists
    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if already in wishlist
    if (user.wishlist.includes(countryId)) {
      return res.status(400).json({ message: 'Country already in wishlist' });
    }

    user.wishlist.push(countryId);
    await user.save();

    const updatedUser = await User.findById(req.user._id)
      .populate('wishlist', 'name code flag continent capital')
      .select('wishlist');

    res.status(201).json({
      message: 'Country added to wishlist',
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove country from wishlist
router.delete('/wishlist/:countryId', auth, async (req, res) => {
  try {
    const { countryId } = req.params;

    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(
      id => id.toString() !== countryId
    );
    await user.save();

    res.json({ message: 'Country removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
