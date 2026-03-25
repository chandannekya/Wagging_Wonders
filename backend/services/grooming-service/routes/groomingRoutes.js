const express = require('express');
const { getGroomers, addGroomer, bookGroomer } = require('../controllers/groomingController');

const router = express.Router();

router.get('/', getGroomers);
router.post('/add', addGroomer);
router.post('/book', bookGroomer);

module.exports = router;
