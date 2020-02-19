/* eslint-disable max-len,comma-dangle */
/**
 * Taken from example by Sirrele on 10/2/17.
 */
'use strict';

module.exports = function(options) {
  let onFinished = require('on-finished');
  const bunyan = require('bunyan');
  const config = require('../config.json');

  return function logError(err, req, res, next) {
    onFinished(res, function() {
      const params = {
        method: req.method,
        parameters: JSON.stringify(req.params),
        error: err
      };
      console.log('Logging: unhandled error', err);
      let log = bunyan.createLogger({name: 'errorCode', streams: [{path: config.errorLoggerFilePath}]});
      log.info(params);
    });
    next();
  };
};
