const express = require('express');
const { createDonation, getDonations, createCheckoutSession } = require('../controllers/donationController');

const router = express.Router();

router.post('/', createDonation);
router.get('/', getDonations);
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
