const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clinicName: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String, default: 'https://via.placeholder.com/150' }
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetSchema);
