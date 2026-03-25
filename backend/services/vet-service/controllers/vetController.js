const Vet = require('../models/Vet');

exports.getVets = async (req, res) => {
  try {
    const vets = await Vet.find();
    res.status(200).json({ success: true, vets });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addVet = async (req, res) => {
  try {
    const newVet = new Vet(req.body);
    await newVet.save();
    res.status(201).json({ success: true, vet: newVet });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    // Stub for booking
    res.status(200).json({ success: true, message: 'Appointment booked successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
