const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  countries: [{
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    startDate: Date,
    endDate: Date,
    notes: String,
    budget: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  }],
  budget: {
    total: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    breakdown: [{
      category: String,
      amount: Number,
      notes: String
    }]
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'cancelled'],
    default: 'planned'
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'friends'],
    default: 'private'
  },
  photos: [{
    url: String,
    caption: String,
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country'
    },
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes
tripSchema.index({ user: 1, createdAt: -1 });
tripSchema.index({ startDate: 1, endDate: 1 });
tripSchema.index({ status: 1 });

module.exports = mongoose.model('Trip', tripSchema);

