const Donation = require('../models/Donation');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51MockTestKeyForWaggingWondersDoNotUseForReal1234');
exports.createDonation = async (req, res) => {
  try {
    const { donorName, email, amount, message, currency } = req.body;
    
    // In a real app, this would integrate with Stripe/PayPal.
    // For now, we simulate a successful transaction.
    const newDonation = new Donation({
      donorName, email, amount, message, currency, status: 'completed'
    });
    
    await newDonation.save();
    res.status(201).json({ success: true, message: 'Donation successful', donation: newDonation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, donations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { amount, message, donorName } = req.body;
    
    // Simulate creating a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Support Wagging Wonders Foundation' },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cancel`,
    });
    
    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
