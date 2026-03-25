const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  image: { type: String, default: 'https://via.placeholder.com/800x400' },
  readTime: { type: Number, default: 5 } // minutes
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
