const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    // Stub for enrollment logic
    res.status(200).json({ success: true, message: 'Successfully enrolled in course!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
