const appRoot = require('app-root-path');
const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose(); // normalerweise nur development mode

const elasticsearch = require('elasticsearch');
const { response } = require('express');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const db = new sqlite3.Database(appRoot + '/data/Northwind.sqlite');

router.get('/populate', async (req, res) => {
  db.each(
    'SELECT Id, ProductName, QuantityPerUnit, UnitPrice FROM Product',
    (err, row) => {
      client.index({
        index: 'products',
        body: row
      })
    },
    (err, count) => {
      if (err) {
        response.send('Ups');
        return;
      } else {
        res.send(count + " Produkte eingepflegt");
        client.indices.refresh({ index: 'products' });
      }
    }
  )
});

router.get('/ping', (req, res) => {
  client.ping({}, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Yep, es läuft.');
    }
  });
});

router.get('/', async (req, res) => {
  const query = req.query;
  const response = await client.search({
    index: 'products',
    body: {
      query: {
        match: query
      }
    }

  })
  res.send(response);
});

module.exports = {
  searchRouter: router
};
