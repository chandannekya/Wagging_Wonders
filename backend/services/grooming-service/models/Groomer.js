const mongoose = require('mongoose');

const groomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, default: 'https://via.placeholder.com/150' }
}, { timestamps: true });

module.exports = mongoose.model('Groomer', groomerSchema);
