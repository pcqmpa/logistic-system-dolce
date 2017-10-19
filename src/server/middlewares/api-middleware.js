/**
 * Module with the api proxy middleware.
 * @module src/server/middlewares/api-middleware
 */

import httpProxy from 'http-proxy';

// Utils.
import { Log } from '../utils/';

// App Config.
import { env } from '../../../config/';

let API_URL = `http://localhost:${env.API_PORT}`;

if (env.MOCK_SERVER) {
  API_URL = `http://localhost:${env.MOCK_API_PORT}`;
}

// Http Proxy instance.
const proxy = httpProxy.createProxyServer({
  target: API_URL,
  ws: true
});

// Catch errors on the proxy.
proxy.on('error', (err, req, res) => {
  const json = {
    error: 'proxy_error',
    reason: err.message
  };

  if (err.code !== 'ECONNRESET') {
    Log.error(err);
  }

  if (!res.headersSent) {
    res.writeHead(500, {
      'content-type': 'application/json'
    });
  }

  res.end(JSON.stringify(json));
});

/**
 * Configure api proxy middleware.
 * @param {Object} app -> The server instance.
 * @param {Object} server -> The http server instance.
 * @returns {void}
 */
const apiMiddleware = (app, server) => {
  app.use('/api/*', (req, res) => {
    proxy.web(req, res, {
      target: `${API_URL}${req.baseUrl}`
    });
  });

  server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
  });
};

export default apiMiddleware;
