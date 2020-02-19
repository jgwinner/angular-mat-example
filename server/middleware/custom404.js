'use strict';
module.exports = function() {
  const path = require('path');
  return function urlNotFound(req, res, next) {
    const angularIndex = path.resolve('client/dist/index.html');
    res.sendFile(angularIndex, function(err) {
      if (err) {
        console.error(err);
        res.status(err.status).end();
      }
    });
  };
};
