const express = require('express');
const { getVets, addVet, bookAppointment } = require('../controllers/vetController');
const router = express.Router();

router.get('/', getVets);
router.post('/add', addVet);
router.post('/book', bookAppointment);

module.exports = router;
