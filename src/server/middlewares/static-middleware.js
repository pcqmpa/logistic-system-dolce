/**
 * Module with the server statics middleware.
 * @module src/server/middlewares/static-middleware
 */
import Express from 'express';

// App Config.
import { env } from '../../../config/config';
import { BUILD_DIR } from '../../../config/paths';

// Config Settings.
const MAX_AGE = (env.DEBUG) ? 0 : '1 year';
const cacheSettings = {
  maxAge: MAX_AGE,
  etag: true,
  lastModified: false
};

/**
 * Static middleware.
 * @param {Object} app -> The server instance.
 * @returns {void}
 */
const staticMiddleware = (app) => {
  app.use(Express.static(BUILD_DIR, cacheSettings));
};

export default staticMiddleware;
