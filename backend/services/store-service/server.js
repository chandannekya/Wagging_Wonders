const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const storeRoutes = require('./routes/storeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for store-service'))
  .catch(err => console.error(err));

app.use('/', storeRoutes);

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`🚀 store-service running on port ${PORT}`));
