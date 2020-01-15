'use strict';

const express = require('express');
const app = express();





module.exports = {
  server: app,
  start: port => {
    port = port || process.env.PORT || 3000;
    app.listen( port, () => console.log(`server listening on port ${port}`));
  },
};