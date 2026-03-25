const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  level: { type: String, default: 'Beginner' },
  image: { type: String, default: 'https://via.placeholder.com/300x200' },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
