const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A country must have a name'],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A country must have a flag image'],
  },
  description: {
    type: String,
    required: [true, 'A country must have a description'],
    trim: true,
  },
  samplePhotos: {
    type: [String],
  },
  createdAt: { type: Date, default: Date.now() },
  startDates: [Date],
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
