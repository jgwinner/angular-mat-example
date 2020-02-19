// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  // jdg: changing to incorporate Angular at teh root as the client.
  // this falls back to the '404' document
  router.get('/status', server.loopback.status());
  // jdg: for client side files, see middleware.json
  // in that file, remember '$! means relative to middleware.json
  server.use(router);
};
