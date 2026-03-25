const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for blog-service'))
  .catch(err => console.error(err));

app.use('/', blogRoutes);

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`🚀 blog-service running on port ${PORT}`));
