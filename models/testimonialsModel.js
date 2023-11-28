const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  avatar: {
    type: String,
    trim: true,
    required: false,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

testimonialSchema.set('timestamps', true);
const testimonial = mongoose.model('Testimonials', testimonialSchema);
module.exports = testimonial;
