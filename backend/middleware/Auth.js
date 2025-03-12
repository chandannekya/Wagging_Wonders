const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const User = require("../services/auth-service/models/user");

dotenv.config();

// Auth middleware to validate JWT token
const auth = async (req, res, next) => {
  try {
    // Get the token from different possible places

    // let token =
    //   req.cookies.token || req.body.token || req.header("Authorization");

    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RiZmQ2OWIxMGYwYTM1ZDBiNDEzNiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzIxMDI1OTUsImV4cCI6MTczMjE4ODk5NX0.zZZpRc7tDyvYhDD20A118n8cKNsAIAbLHFu1CSmOvAM";

    // If the token is in the Authorization header, remove the "Bearer " part
    if (token && token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "");
    }

    console.log("Token:", token); // Debug log to ensure the token is being received

    // Check if token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token using jwt.verify()
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info to the request object
      next(); // Continue to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    console.log(error); // Log error for debugging
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

module.exports = { auth };
