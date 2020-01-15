'use strict';

// run at application level
module.exports = (req, res, next) => {
  console.log(req.method, req.path, req.requestTime);
  next();
};
// execute a console.log() containing request path, method, and
// requestTime property of the request object