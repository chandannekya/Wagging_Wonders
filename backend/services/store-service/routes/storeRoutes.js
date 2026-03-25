const express = require('express');
const { getProducts, addProduct, placeOrder, createCheckoutSession } = require('../controllers/storeController');
const router = express.Router();

router.get('/', getProducts);
router.post('/add', addProduct);
router.post('/order', placeOrder);
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
