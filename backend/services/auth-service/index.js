const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./config/db"); // Import centralized DB
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If you're using cookies or authentication
  })
);

// Connect to MongoDB BEFORE starting the server

databaseConnection(); // Ensures DB is connected before proceeding
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5001, () =>
  console.log("🚀 Auth Service running on port 5001")
);
