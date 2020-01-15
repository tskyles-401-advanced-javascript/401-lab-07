'use strict';

// run at application level *(app.use)
module.exports = (req, res, next) => {
  req.timeStamp = new Date.toString();
  next();
};
// put current timestamp formatted as proper date on request object 
// in a property called requestTime