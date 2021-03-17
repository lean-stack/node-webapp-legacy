const express = require('express');
const handlebars = require('express-handlebars');
const appRoot = require('app-root-path');
const { ratesRouter } = require('./routes/exrates');
const { dbRouter } = require('./routes/dbaccess');
const { productsApiRouter } = require('./routes/api/products');
const { searchRouter } = require('./routes/search');

// Create Express App
const app = express();

// Middlewares (aka body-parser zum Beispiel für JSON-Daten im Request Body)
app.use(express.json());

// Configure View Engine
app.engine('hbs', handlebars());
app.set('view engine', 'hbs');
app.set('views', appRoot + '/server/view');

// Serve static web page
app.use(express.static(appRoot + '/dist'));

// Serve dynamic routes
app.use('/rates', ratesRouter);
app.use('/db', dbRouter);
app.use('/api', productsApiRouter);
app.use('/search', searchRouter);

module.exports = {
  app
};
