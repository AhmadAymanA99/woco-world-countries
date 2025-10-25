const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    length: 2
  },
  continent: {
    type: String,
    required: true,
    enum: ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica']
  },
  flag: {
    type: String,
    required: true
  },
  anthem: {
    title: String,
    audioUrl: String,
    lyrics: String
  },
  geographicLocation: {
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    area: Number, // in square kilometers
    borders: [String], // neighboring countries
    coastline: Number // in kilometers
  },
  population: {
    total: Number,
    density: Number, // per square kilometer
    growthRate: Number, // percentage
    urbanPopulation: Number // percentage
  },
  gdp: {
    total: Number, // in USD
    perCapita: Number, // in USD
    growthRate: Number, // percentage
    sectors: {
      agriculture: Number,
      industry: Number,
      services: Number
    }
  },
  religions: [{
    name: String,
    percentage: Number
  }],
  traditions: [{
    name: String,
    description: String,
    category: {
      type: String,
      enum: ['festival', 'custom', 'ceremony', 'art', 'music', 'dance', 'food', 'sport', 'cultural', 'other']
    }
  }],
  touristAttractions: [{
    name: String,
    description: String,
    location: String,
    category: {
      type: String,
      enum: ['historical', 'natural', 'cultural', 'religious', 'adventure', 'beach', 'mountain', 'city', 'other']
    },
    imageUrl: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }],
  capital: String,
  currency: String,
  languages: [String],
  timezone: [String],
  climate: String,
  government: String,
  independence: String,
  nationalDay: String
}, {
  timestamps: true
});

// Indexes for better performance
countrySchema.index({ name: 1 });
countrySchema.index({ continent: 1 });
countrySchema.index({ code: 1 });

module.exports = mongoose.model('Country', countrySchema);
