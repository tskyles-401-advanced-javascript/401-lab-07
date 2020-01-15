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



module.exports = {
  server: app,
  start: port => {
    port = port || process.env.PORT || 3000;
    app.listen( port, () => console.log(`server listening on port ${port}`));
  },
};