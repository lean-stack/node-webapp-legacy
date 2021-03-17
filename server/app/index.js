const express = require('express');
const appRoot = require('app-root-path');
const { ratesRouter } = require('./routes/exrates');

// Create Express App
const app = express();

// Serve static web page
app.use(express.static(appRoot + '/dist'));

// Serve dynamic routes
app.use('/rates', ratesRouter);

module.exports = {
  app
};
