const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const groomingRoutes = require('./routes/groomingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for grooming-service'))
  .catch(err => console.error(err));

app.use('/', groomingRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`🚀 grooming-service running on port ${PORT}`));
