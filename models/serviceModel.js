const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  checked: {
    type: Boolean,
    default: true,
    trim: true,
  },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  features: {
    type: [FeatureSchema],
  },
  recommended: {
    type: Boolean,
    default: false,
  },
  price: {
    type: String,
    trim: true,
    required: false,
  },
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
