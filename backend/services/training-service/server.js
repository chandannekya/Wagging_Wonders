const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const trainingRoutes = require('./routes/trainingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for training-service'))
  .catch(err => console.error(err));

app.use('/', trainingRoutes);

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => console.log(`🚀 training-service running on port ${PORT}`));
