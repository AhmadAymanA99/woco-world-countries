const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  visitedCountries: [{
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    visitDate: {
      type: Date,
      required: true
    },
    duration: Number, // in days
    notes: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    photos: [{
      url: String,
      caption: String,
      uploadDate: {
        type: Date,
        default: Date.now
      }
    }],
    cities: [String],
    activities: [String]
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  }],
  preferences: {
    interests: [String],
    travelStyle: {
      type: String,
      enum: ['budget', 'luxury', 'adventure', 'cultural', 'relaxation', 'mixed']
    },
    accommodation: {
      type: String,
      enum: ['hotel', 'hostel', 'airbnb', 'camping', 'mixed']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  emailVerified: {
    type: Boolean,
    default: false
  },
  // Social features
  profileVisibility: {
    type: String,
    enum: ['public', 'private', 'friends'],
    default: 'public'
  },
  bio: {
    type: String,
    maxlength: 500
  },
  location: String,
  website: String,
  socialLinks: {
    instagram: String,
    twitter: String,
    facebook: String
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to add visited country
userSchema.methods.addVisitedCountry = function(countryId, visitData) {
  const existingVisit = this.visitedCountries.find(
    visit => visit.country.toString() === countryId.toString()
  );
  
  if (existingVisit) {
    // Update existing visit
    Object.assign(existingVisit, visitData);
  } else {
    // Add new visit
    this.visitedCountries.push({
      country: countryId,
      ...visitData
    });
  }
  
  return this.save();
};

// Method to add photo to country visit
userSchema.methods.addPhotoToVisit = function(countryId, photoData) {
  const visit = this.visitedCountries.find(
    visit => visit.country.toString() === countryId.toString()
  );
  
  if (visit && visit.photos.length < 10) {
    visit.photos.push(photoData);
    return this.save();
  }
  
  throw new Error('Visit not found or photo limit exceeded');
};

module.exports = mongoose.model('User', userSchema);
