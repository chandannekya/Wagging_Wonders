const multer = require("multer");
const path = require("path");

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the directory where files will be temporarily stored
    cb(null, "uploads/"); // Make sure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    // Define the filename to be used
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

// Create a multer instance
const upload = multer({ storage });

module.exports = upload;
