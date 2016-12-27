/**
 * Module with the express server config.
 * @module src/server/server
 */
import Express from 'express';
import { Server } from 'http';
import compression from 'compression';

// App config.
import { env } from '../../config/';

// Utils.
import { Log } from './utils/';

// Constants.
import { SIGNAL } from '../shared/constants/messages';

// Middlewares.
import * as middlewares from './middlewares/';

// Express server
const app = new Express();
const server = new Server(app);

//
// Express Configuration
// -----------------------------------------------------------------------------

// Compression.
if (!env.DEBUG) {
  app.use(compression());
}

// Set server env constant.
global._CLIENT_ = false;

// Middlewares.

// I. Static Assets.
middlewares.staticMiddleware(app);
// II. Session.
middlewares.sessionMiddleware(app);
// III. API Proxy.
middlewares.apiMiddleware(app, server);
// IV. Render.
middlewares.renderMiddleware(app);

//
// Initialise Express
// -----------------------------------------------------------------------------
server.listen(env.SERVER_PORT, (err) => {
  if (err) {
    Log.error(err);
  } else {
    Log.log(`${SIGNAL} http://${env.HOST}:${env.SERVER_PORT}`);
  }
});
