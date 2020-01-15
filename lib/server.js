'use strict';

const express = require('express');
const app = express();

const timestamp = require('./middleware/timestamp');
const logger = require('./middleware/logger');

const notFoundHandler = require('./middleware/errorHandling/404');
const errorHandler = require('./middleware/errorHandling/500');

app.use(express.json);
app.use(logger);
app.use(timestamp);
app.use(errorHandler);

app.use('*', notFoundHandler);

let db = [{
  categories: {},
  products: {},
}];

// product routes
app.get('/products', timestamp, logger, (req, res, next) => {
  let count = db.products.length;
  let results = db.products;
  res.json({ count, results });
});

app.get('./products:id', timestamp, logger, (req, res, next) => {
  let id = req.params.id;
  let record = db.products.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});

app.post('/products', (req, res, next) => {
  let { category_id, price, weight, quantity, id } = req.body;
  let record = { category_id, price, weight, quantity, id };
  db.products.push(record);
  res.json(record);
});

app.put('./products:id', (req, res, next) => {
  let idToUpdate = req.param.id;
  let { category_id, price, weight, quantity, id } = req.body;
  let updatedRecord = { category_id, price, weight, quantity, id };
  let db = db.products.map(record => {record.id !== parseInt(idToUpdate)? updatedRecord: record;});
  res.json(updatedRecord);
});

app.delete('./products:id', (req, res, next) => {
  let id = req.params.id;
  db = db.products.filter(record => record.id !== parseInt(id));
  res.json({});
});

//categories routes
app.get('/categories', timestamp, logger, (req, res, next) => {
  let count = db.categories.length;
  let results = db.categories;
  res.json({ count, results });
});

app.get('./categories:id', timestamp, logger, (req, res, next) => {
  let id = req.params.id;
  let record = db.categories.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});

app.post('/categories', (req, res, next) => {
  let { name, id } = req.body;
  let record = { name, id };
  db.categories.push(record);
  res.json(record);
});

app.put('./categories:id', (req, res, next) => {
  let idToUpdate = req.param.id;
  let { name, id } = req.body;
  let updatedRecord = { name, id };
  let db = db.categories.map(record => {record.id !== parseInt(idToUpdate)? updatedRecord: record;});
  res.json(updatedRecord);
});

app.delete('./categories:id', (req, res, next) => {
  let id = req.params.id;
  db = db.categories.filter(record => record.id !== parseInt(id));
  res.json({});
});


module.exports = {
  server: app,
  start: port => {
    port = port || process.env.PORT || 3000;
    app.listen( port, () => console.log(`server listening on port ${port}`));
  },
};