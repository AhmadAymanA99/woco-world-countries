const express = require('express');
const User = require('../models/User');
const Follow = require('../models/Follow');
const Story = require('../models/Story');
const Collection = require('../models/Collection');
const auth = require('../middleware/auth');

const router = express.Router();

// Get public profile
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('username firstName lastName avatar bio location website socialLinks profileVisibility createdAt')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get stats
    const visitedCount = await User.aggregate([
      { $match: { _id: user._id } },
      { $project: { count: { $size: '$visitedCountries' } } }
    ]);

    const wishlistCount = await User.aggregate([
      { $match: { _id: user._id } },
      { $project: { count: { $size: '$wishlist' } } }
    ]);

    const storiesCount = await Story.countDocuments({ 
      author: user._id, 
      visibility: 'public' 
    });

    const collectionsCount = await Collection.countDocuments({ 
      user: user._id, 
      visibility: 'public' 
    });

    const followersCount = await Follow.countDocuments({ following: user._id });
    const followingCount = await Follow.countDocuments({ follower: user._id });

    res.json({
      ...user,
      stats: {
        visitedCountries: visitedCount[0]?.count || 0,
        wishlist: wishlistCount[0]?.count || 0,
        stories: storiesCount,
        collections: collectionsCount,
        followers: followersCount,
        following: followingCount
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Follow user
router.post('/follow/:userId', auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.params.userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const existingFollow = await Follow.findOne({
      follower: req.user._id,
      following: req.params.userId
    });

    if (existingFollow) {
      await existingFollow.deleteOne();
      return res.json({ following: false });
    }

    const follow = new Follow({
      follower: req.user._id,
      following: req.params.userId
    });

    await follow.save();
    res.json({ following: true });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if following
router.get('/follow/:userId', auth, async (req, res) => {
  try {
    const follow = await Follow.findOne({
      follower: req.user._id,
      following: req.params.userId
    });

    res.json({ following: !!follow });
  } catch (error) {
    console.error('Check follow error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get followers
router.get('/followers/:userId', async (req, res) => {
  try {
    const followers = await Follow.find({ following: req.params.userId })
      .populate('follower', 'username firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(followers.map(f => f.follower));
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get following
router.get('/following/:userId', async (req, res) => {
  try {
    const following = await Follow.find({ follower: req.params.userId })
      .populate('following', 'username firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(following.map(f => f.following));
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leaderboard - Most countries visited
router.get('/leaderboard/countries', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const users = await User.aggregate([
      {
        $project: {
          username: 1,
          firstName: 1,
          lastName: 1,
          avatar: 1,
          visitedCount: { $size: { $ifNull: ['$visitedCountries', []] } }
        }
      },
      { $match: { visitedCount: { $gt: 0 } } },
      { $sort: { visitedCount: -1 } },
      { $limit: limit }
    ]);

    res.json(users);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leaderboard - Most continents visited
router.get('/leaderboard/continents', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const users = await User.aggregate([
      {
        $unwind: { path: '$visitedCountries', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'countries',
          localField: 'visitedCountries.country',
          foreignField: '_id',
          as: 'countryData'
        }
      },
      {
        $unwind: { path: '$countryData', preserveNullAndEmptyArrays: true }
      },
      {
        $group: {
          _id: '$_id',
          username: { $first: '$username' },
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          avatar: { $first: '$avatar' },
          continents: { $addToSet: '$countryData.continent' }
        }
      },
      {
        $project: {
          username: 1,
          firstName: 1,
          lastName: 1,
          avatar: 1,
          continentCount: { $size: { $filter: { input: '$continents', as: 'c', cond: { $ne: ['$$c', null] } } } }
        }
      },
      { $match: { continentCount: { $gt: 0 } } },
      { $sort: { continentCount: -1 } },
      { $limit: limit }
    ]);

    res.json(users);
  } catch (error) {
    console.error('Continents leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recommendations - Users who visited similar countries
router.get('/recommendations/users', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const visitedIds = user.visitedCountries.map(v => v.country.toString());

    if (visitedIds.length === 0) {
      // If user hasn't visited any countries, recommend popular travelers
      const popular = await User.aggregate([
        {
          $project: {
            username: 1,
            firstName: 1,
            lastName: 1,
            avatar: 1,
            visitedCount: { $size: { $ifNull: ['$visitedCountries', []] } }
          }
        },
        { $match: { visitedCount: { $gt: 0 }, _id: { $ne: req.user._id } } },
        { $sort: { visitedCount: -1 } },
        { $limit: 5 }
      ]);
      return res.json(popular);
    }

    // Find users who visited similar countries
    const similarUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: req.user._id },
          'visitedCountries.country': { $in: visitedIds.map(id => new require('mongoose').Types.ObjectId(id)) }
        }
      },
      {
        $project: {
          username: 1,
          firstName: 1,
          lastName: 1,
          avatar: 1,
          commonCountries: {
            $size: {
              $filter: {
                input: '$visitedCountries',
                as: 'visit',
                cond: { $in: ['$$visit.country', visitedIds.map(id => new require('mongoose').Types.ObjectId(id))] }
              }
            }
          },
          totalVisited: { $size: { $ifNull: ['$visitedCountries', []] } }
        }
      },
      { $sort: { commonCountries: -1, totalVisited: -1 } },
      { $limit: 10 }
    ]);

    res.json(similarUsers);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get country recommendations based on visited countries
router.get('/recommendations/countries', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('visitedCountries.country', 'continent');
    
    const visitedCountries = user.visitedCountries.map(v => v.country._id.toString());
    const visitedContinents = [...new Set(user.visitedCountries.map(v => v.country.continent))];

    // Get countries in same continents but not visited
    const Country = require('../models/Country');
    const recommendations = await Country.find({
      _id: { $nin: visitedCountries },
      continent: { $in: visitedContinents }
    })
      .select('name code flag continent capital population.total')
      .limit(10)
      .sort({ 'population.total': -1 });

    res.json(recommendations);
  } catch (error) {
    console.error('Get country recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

