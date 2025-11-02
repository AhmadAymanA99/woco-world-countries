const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique follower-following pairs
followSchema.index({ follower: 1, following: 1 }, { unique: true });
followSchema.index({ following: 1 });

// Prevent self-follow
followSchema.pre('save', function(next) {
  if (this.follower.toString() === this.following.toString()) {
    next(new Error('Cannot follow yourself'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Follow', followSchema);

