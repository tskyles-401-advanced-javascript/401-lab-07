'use strict';

const DataModel = require('./memory-model');

class Products extends DataModel {
  constructor() {
    let schema = {
      category_id: { type: 'string', required: true },
      price: { type: 'number', required: true },
      weight: { type: 'number' },
      quantity_in_stock: { type: 'number', required: true },
    };
    super(schema);
  }
}


module.exports = Products;