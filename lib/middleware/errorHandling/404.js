'use strict';

module.exports = (req, res, next) => {
  console.log('uknown route');
  res.status(404);
  res.send('no idea where you want to go');
  res.send();
} ;