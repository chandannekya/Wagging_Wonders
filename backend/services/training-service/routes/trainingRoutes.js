const express = require('express');
const { getCourses, addCourse, enrollCourse } = require('../controllers/trainingController');
const router = express.Router();

router.get('/', getCourses);
router.post('/add', addCourse);
router.post('/enroll', enrollCourse);

module.exports = router;
