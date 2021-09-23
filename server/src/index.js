const express = require('express');
const morgan = require('morgan'); // shows the format and helps debug.
const helmet = require('helmet'); // block headers.
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares'); // exporting file middlewares.js into index.js

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

// simple middleware message
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

// Errors middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHander);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
