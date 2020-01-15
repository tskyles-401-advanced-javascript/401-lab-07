'use strict';

/**
 * @module invalidRouteHandler
 */
module.exports = (req, res, next) => {
  console.log('unknown route');
  res.status(404);
  res.send('no idea where you want to go');
  res.send();
} ;