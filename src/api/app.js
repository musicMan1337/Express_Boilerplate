require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('../config/config');
const errorHandler = require('../middlewares/errors');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express boilerplate initialized!');
});

// eslint-disable-next-line no-unused-vars
app.use(errorHandler)


module.exports = app;
