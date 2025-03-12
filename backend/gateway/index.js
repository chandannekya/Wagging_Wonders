require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
require("./routes")(app);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
