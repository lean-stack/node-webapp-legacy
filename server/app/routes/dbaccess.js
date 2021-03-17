const appRoot = require('app-root-path');
const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose(); // normalerweise nur development mode

const db = new sqlite3.Database(appRoot + '/data/Northwind.sqlite');

router.get('/', (req, res) => {
  db.serialize(() => {
    db.all("SELECT * FROM Product", (err, rows) => {
      res.render('products', { title: 'Artikelliste', products: rows });
    });
  });
});

module.exports = {
  dbRouter: router
};
