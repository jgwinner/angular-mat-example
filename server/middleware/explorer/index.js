/**
 * Middleware for LoopBack's API Explorer
 **/
export default function (server) {
  var explorer;
  try {
    explorer = require('loopback-explorer');
  } catch (err) {
    console.log(
      'Run `npm install loopback-explorer` to enable the LoopBack explorer'
    );
    return;
  }

  var restApiRoot = server.get('restApiRoot');

  var explorerApp = explorer(server, { basePath: restApiRoot, protocol: 'https' });
  server.use('/explorer', explorerApp);
  server.once('started', function () {
    var baseUrl = server.get('url').replace(/\/$/, '');
    var explorerPath = explorerApp.mountpath || explorerApp.route;
    console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
  });
};
