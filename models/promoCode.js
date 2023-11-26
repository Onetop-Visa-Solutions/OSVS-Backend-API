const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    trim: true,
    required: true,
  },
  discount: {
    type: Number,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  limit: {
    type: Number,
    trim: true,
    required: true,
  },
});

const promoCode = mongoose.model('promoCode', promoCodeSchema);
module.exports = promoCode;
