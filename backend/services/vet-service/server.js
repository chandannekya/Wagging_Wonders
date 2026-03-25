const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const vetRoutes = require('./routes/vetRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for vet-service'))
  .catch(err => console.error(err));

app.use('/', vetRoutes);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`🚀 vet-service running on port ${PORT}`));
