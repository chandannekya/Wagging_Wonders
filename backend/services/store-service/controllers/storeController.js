const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51MockTestKeyForWaggingWondersDoNotUseForReal1234');
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    // Stub for order processing
    res.status(200).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    
    // For a real app, you'd fetch real Product documents by ID here to guarantee secure prices.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(id => ({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Premium Wagging Wonders Product' },
          unit_amount: Math.round(totalAmount * 100), // Note: securely fetching price per item is best practice
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cancel`,
    });
    
    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
