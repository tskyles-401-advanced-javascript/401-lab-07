'use strict';

/**
 * @exports errorHandler
 */
module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
};