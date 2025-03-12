const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./config/db");
const petRoutes = require("./routes/petRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to MongoDB
databaseConnection();

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/pet", petRoutes);
// app.use("/api/pet", (req, res) => {
//   res.send("heloo from pet service");
// });

app.listen(process.env.PORT || 5002, () =>
  console.log("🚀 Pet Service running on port 5002")
);

