const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Trip = require('../models/Trip');
const Collection = require('../models/Collection');
const Story = require('../models/Story');
const Follow = require('../models/Follow');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage((value, { req }) => req.t('validation.usernameMinLength')),
  body('email').isEmail().withMessage((value, { req }) => req.t('validation.validEmail')),
  body('password').isLength({ min: 6 }).withMessage((value, { req }) => req.t('validation.passwordMinLength')),
  body('firstName').notEmpty().withMessage((value, { req }) => req.t('validation.firstNameRequired')),
  body('lastName').notEmpty().withMessage((value, { req }) => req.t('validation.lastNameRequired'))
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: req.t('auth.emailOrUsernameExists') 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await user.save();

    // Generate JWT
    const payload = {
      userId: user._id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: req.t('auth.registerSuccess'),
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: req.t('auth.serverErrorRegistration') });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage((value, { req }) => req.t('validation.validEmail')),
  body('password').notEmpty().withMessage((value, { req }) => req.t('validation.passwordRequired'))
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: req.t('auth.invalidCredentials') });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: req.t('auth.invalidCredentials') });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const payload = {
      userId: user._id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      message: req.t('auth.loginSuccess'),
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: req.t('auth.serverErrorLogin') });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('visitedCountries.country', 'name code flag continent')
      .populate('wishlist', 'name code flag continent');

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: req.t('auth.serverError') });
  }
});

// Update profile
router.put('/profile', auth, [
  body('firstName').optional().notEmpty().withMessage((value, { req }) => req.t('validation.firstNameNotEmpty')),
  body('lastName').optional().notEmpty().withMessage((value, { req }) => req.t('validation.lastNameNotEmpty')),
  body('username').optional().isLength({ min: 3 }).withMessage((value, { req }) => req.t('validation.usernameMinLength'))
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, username, preferences } = req.body;
    const updateData = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (username) {
      // Check if username is already taken
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: req.user._id } 
      });
      if (existingUser) {
        return res.status(400).json({ message: req.t('auth.usernameTaken') });
      }
      updateData.username = username;
    }
    if (preferences) updateData.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: req.t('auth.profileUpdated'),
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: req.t('auth.serverError') });
  }
});

// Delete account
router.delete('/account', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all trips belonging to the user
    await Trip.deleteMany({ user: userId });

    // Delete all collections belonging to the user
    await Collection.deleteMany({ user: userId });

    // Remove user from likes and comments in other stories
    await Story.updateMany(
      {},
      {
        $pull: {
          likes: { user: userId },
          comments: { user: userId }
        }
      }
    );

    // Delete all stories authored by the user
    await Story.deleteMany({ author: userId });

    // Remove user from likes and followers in collections (belonging to others)
    await Collection.updateMany(
      { user: { $ne: userId } },
      {
        $pull: {
          likes: { user: userId },
          followers: userId
        }
      }
    );

    // Delete all follow relationships where user is follower or following
    await Follow.deleteMany({
      $or: [
        { follower: userId },
        { following: userId }
      ]
    });

    // Finally, delete the user
    await User.findByIdAndDelete(userId);

    res.json({
      message: req.t('auth.accountDeleted')
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ message: req.t('auth.serverErrorDeletion') });
  }
});

module.exports = router;
