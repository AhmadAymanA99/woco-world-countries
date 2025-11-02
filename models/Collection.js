const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  countries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  }],
  category: {
    type: String,
    enum: ['custom', 'islands', 'landlocked', 'coastal', 'mountains', 'deserts', 'cities', 'heritage', 'adventure', 'other'],
    default: 'custom'
  },
  coverImage: String,
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'],
    default: 'public'
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Indexes
collectionSchema.index({ user: 1, createdAt: -1 });
collectionSchema.index({ category: 1, visibility: 1 });
collectionSchema.index({ visibility: 1 });

module.exports = mongoose.model('Collection', collectionSchema);

