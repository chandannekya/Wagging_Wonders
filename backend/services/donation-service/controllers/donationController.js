const Donation = require("../models/donation");

const createDonation = async (req, res) => {
  try {
    const userId = req.userId;

    const { amount } = req.body;

    const donation = await new Donation.create({
      donorId: userId,
      amount,
    });

    res.status(201).json({ donation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({ donations });

    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDonationsByuser = async (req, res) => {
  try {
    const userId = req.userId;

    const donations = await Donation.find({ donor });

    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
