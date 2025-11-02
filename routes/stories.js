const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const Story = require('../models/Story');
const User = require('../models/User');
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

// Get all public stories
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, country, author } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = { visibility: 'public', isPublished: true };
    if (country) query.country = country;
    if (author) query.author = author;

    const stories = await Story.find(query)
      .populate('author', 'username firstName lastName avatar')
      .populate('country', 'name code flag')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Story.countDocuments(query);

    res.json({ stories, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single story
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('author', 'username firstName lastName avatar bio')
      .populate('country', 'name code flag continent')
      .populate('comments.user', 'username firstName lastName avatar');

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Increment views
    story.views += 1;
    await story.save();

    res.json(story);
  } catch (error) {
    console.error('Get story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create story
router.post('/', auth, [
  body('title').trim().isLength({ min: 1, max: 200 }),
  body('content').trim().isLength({ min: 1 }),
  body('countryId').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, countryId, excerpt, tags, visibility } = req.body;

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const story = new Story({
      author: req.user._id,
      country: countryId,
      title,
      content,
      excerpt: excerpt || content.substring(0, 300),
      tags: tags || [],
      visibility: visibility || 'public'
    });

    await story.save();
    await story.populate('author', 'username firstName lastName avatar');
    await story.populate('country', 'name code flag');

    res.status(201).json(story);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update story
router.put('/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(story, req.body);
    if (req.body.content && !req.body.excerpt) {
      story.excerpt = req.body.content.substring(0, 300);
    }

    await story.save();
    res.json(story);
  } catch (error) {
    console.error('Update story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete story
router.delete('/:id', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    if (story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await story.deleteOne();
    res.json({ message: 'Story deleted' });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/unlike story
router.post('/:id/like', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const likeIndex = story.likes.findIndex(
      like => like.user.toString() === req.user._id.toString()
    );

    if (likeIndex > -1) {
      story.likes.splice(likeIndex, 1);
    } else {
      story.likes.push({ user: req.user._id });
    }

    await story.save();
    res.json({ liked: likeIndex === -1, likesCount: story.likes.length });
  } catch (error) {
    console.error('Like story error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/:id/comments', auth, [
  body('content').trim().isLength({ min: 1, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    story.comments.push({
      user: req.user._id,
      content: req.body.content
    });

    await story.save();
    await story.populate('comments.user', 'username firstName lastName avatar');
    
    res.status(201).json(story.comments[story.comments.length - 1]);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete comment
router.delete('/:id/comments/:commentId', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const comment = story.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user._id.toString() && 
        story.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    comment.deleteOne();
    await story.save();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

