const { Sequelize, DataTypes } = require('sequelize');
const appRoot = require('app-root-path');
const router = require('express').Router();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: appRoot + '/data/Northwind.sqlite',
});

const Category = sequelize.define('Category', {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  CategoryName: DataTypes.STRING,
  Description: DataTypes.STRING
}, {
  tableName: 'Category',
  timestamps: false
});

const Product = sequelize.define('Product', {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ProductName: DataTypes.STRING,
  QuantityPerUnit: DataTypes.STRING,
  UnitPrice: DataTypes.DECIMAL,
  SupplierId: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: null
  },
  UnitsInStock: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
    allowNull: null
  },
  UnitsOnOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
    allowNull: null
  },
  ReorderLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    allowNull: null
  },
  Discontinued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: null
  }
}, {
  tableName: 'Product',
  timestamps: false
});

Category.hasMany(Product, { foreignKey: 'CategoryId' });
Product.belongsTo(Category);

router.get('/products', async (req, res) => {
  const products = await Product.findAll(); // { limit: 10 });
  res.send(products);
});

// router.post('/products', async (req, res) => {});
router.get('/products/add', async (req, res) => {
  // const p = Product.build(req.body);
  const p = Product.build({
    ProductName: 'Spreewaldgurke',
    QuantityPerUnit: '1 Glas',
    UnitPrice: 2.8,
    CategoryId: 2
   });
  await p.save();
  // oder einzeilig
  // const p = await Product.create({
  //   ProductName: 'Spreewaldgurke',
  //   QuantityPerUnit: '1 Glas',
  //   UnitPrice: 2.8,
  //   CategoryId: 2
  //  });
  res.send(p);
});

// Produkte nach Kategorie
router.get('/products/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  const products = await category.getProducts();

  // TODO: google for a better solution
  // const rows = products.map(p => ({
  //   Id: p.Id,
  //   ProductName: p.ProductName,
  //   QuantityPerUnit: p.QuantityPerUnit,
  //   UnitPrice: p.UnitPrice
  // }));

  // Alternative Idee
  // const rows2 = JSON.parse(JSON.stringify(products));

  // res.send(products);

  res.render('products', { title: category.CategoryName,
    products: products.map(p => p.dataValues ) });
});

module.exports = {
  productsApiRouter: router
};
