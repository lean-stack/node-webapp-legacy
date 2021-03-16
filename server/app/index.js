const express = require('express');
const appRoot = require('app-root-path');

// Create Express App
const app = express();

// Serve static web page
app.use(express.static(appRoot + '/client'));

module.exports = {
  app
};
