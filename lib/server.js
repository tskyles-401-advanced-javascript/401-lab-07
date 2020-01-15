'use strict';

const express = require('express');
const app = express();

const timestamp = require('./middleware/timestamp');
const logger = require('./middleware/logger');

const notFoundHandler = require('./middleware/errorHandling/404');
const errorHandler = require('./middleware/errorHandling/500');

app.use(express.json());
app.use(logger);
app.use(timestamp);
app.use(errorHandler);

let db = [{
  categories: [],
  products: [
    {
      category_id: '1',
      price: 10,
      weight: 30,
      quantity: 10,
      id: 1,
    },
  ],
}];
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getProducts = (req, res, next) => {
  let count = db[0].products.length;
  let results = db[0].products;
  res.json({ count, results });
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getOneProduct = (req, res, next) => {
  let id = req.params.id;
  let record = db[0].products.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
};

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const postProduct = (req, res, next) => {
  let { category_id, price, weight, quantity, id } = req.body;
  let record = { category_id, price, weight, quantity, id };
  record.id = db[0].products.length;
  db[0].products.push(record);
  res.json(record);
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const putProduct = (req, res, next) => {
  let idToUpdate = req.param.id;
  let { category_id, price, weight, quantity, id } = req.body;
  let updatedRecord = { category_id, price, weight, quantity, id };
  let db = db[0].products.map(record => {record.id !== parseInt(idToUpdate)? updatedRecord: record;});
  res.json(updatedRecord);
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteProduct = (req, res, next) => {
  let id = req.params.id;
  db = db[0].products.filter(record => record.id !== parseInt(id));
  res.json({});
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getCategories = (req, res, next) => {
  let count = db[0].categories.length;
  let results = db[0].categories;
  res.json({ count, results });
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getOneCategory = (req, res, next) => {
  let id = req.params.id;
  let record = db[0].categories.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const postCategory = (req, res, next) => {
  let { name, id } = req.body;
  let record = { name, id };
  db[0].categories.push(record);
  res.json(record);
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const putCategory = (req, res, next) => {
  let idToUpdate = req.param.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  let db = db[0].categories.map(record => {record.id !== parseInt(idToUpdate)? updatedRecord: record;});
  res.json(updatedRecord);
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteCategory = (req, res, next) => {
  let id = req.params.id;
  db = db[0].categories.filter(record => record.id !== parseInt(id));
  res.json({});
};

// product routes
app.get('/products', timestamp, logger, getProducts);
app.get('/products/:id', timestamp, logger, getOneProduct);
app.post('/products', timestamp, logger, postProduct);
app.put('/products/:id', timestamp, logger, putProduct);
app.delete('./products:id', timestamp, logger, deleteProduct);
//categories routes
app.get('/categories', timestamp, logger, getCategories);
app.get('/categories/:id', timestamp, logger, getOneCategory);
app.post('/categories', timestamp, logger, postCategory);
app.put('/categories/:id', timestamp, logger, putCategory);
app.delete('./categories:id', timestamp, logger, deleteCategory);
//route catch all
app.use('*', notFoundHandler);

module.exports = {
  server: app,
  start: port => {
    port = port || process.env.PORT || 3000;
    app.listen( port, () => console.log(`server listening on port ${port}`));
  },
};