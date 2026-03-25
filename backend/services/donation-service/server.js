const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const donationRoutes = require('./routes/donationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for donation-service'))
  .catch(err => console.error(err));

app.use('/', donationRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`🚀 donation-service running on port ${PORT}`));
