const Groomer = require('../models/Groomer');

exports.getGroomers = async (req, res) => {
  try {
    const groomers = await Groomer.find();
    res.status(200).json({ success: true, groomers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.addGroomer = async (req, res) => {
  try {
    const { name, specialty, location, price, image } = req.body;
    const newGroomer = new Groomer({ name, specialty, location, price, image });
    await newGroomer.save();
    res.status(201).json({ success: true, groomer: newGroomer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Booking endpoint stub
exports.bookGroomer = async (req, res) => {
  try {
    const { groomerId, userId, date } = req.body;
    // Real implementation would save to a Booking collection
    res.status(200).json({ success: true, message: 'Booking confirmed!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
