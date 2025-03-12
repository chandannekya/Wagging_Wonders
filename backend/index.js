const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const databaseConnection=require("./config/db");
const dotenv=require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

databaseConnection();
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
