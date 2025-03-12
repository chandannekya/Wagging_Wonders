const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s
      connectTimeoutMS: 10000, // Return from connection attempts after 10s
    });
    console.log("Mongoose Connection State:", mongoose.connection.readyState);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error.message);
    process.exit(1);
  }
};

module.exports = databaseConnection;
