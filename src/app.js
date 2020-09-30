require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV, CORS_ORIGIN_DEV, CORS_ORIGIN_PROD } = require('./config');

const errors = require('../src/middlewares/errors');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'dev';
const morganSkip = { skip: NODE_ENV === 'test' };
const corsOrigin = {
  origin: NODE_ENV === 'production' ? CORS_ORIGIN_DEV : CORS_ORIGIN_PROD
};

const app = express();
app.use(morgan(morganOption, morganSkip));
app.use(cors(corsOrigin));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Express boilerplate initialized!');
});

/*
| ROUTES HERE -------------------------
*/

/*
|--------------------------------------
*/

app.use(errors.notFound);
app.use(errors.errorHandler);

module.exports = app;
