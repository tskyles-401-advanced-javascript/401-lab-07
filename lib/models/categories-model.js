'use strict';

const DataModel = require('./memory-model.js');
/**
 * @class Categories
 * @extends {DataModel}
 */
class Categories extends DataModel {
  constructor() {
    let schema = {
      id: { required: true },
      name: { type: 'string', required: true },
    };
    super(schema);
  }
}
/**
 *  @module categories
 */
module.exports = Categories;