/**
 * Module with the express session middleware.
 * @module src/server/middlewares/session-middleware
 */

import session from 'express-session';
import connectMongo from 'connect-mongo';

// App Config.
import {
  env,
  SESSION_SECRET
} from '../../../config/config';

/**
 * Configure session store middleware with mongodb.
 * @param {Object} app -> The server instance.
 * @returns {void}
 */
const sessionMiddleware = (app) => {
  const MongoStore = connectMongo(session);
  const storeOptions = {
    url: env.MONGODB_HOST,
    autoRemove: 'disabled'
  };
  const sessionOptions = {
    secret: SESSION_SECRET,
    saveUninitialized: false, // don't create session until something stored
    resave: false, // don't save session if unmodified
    store: new MongoStore(storeOptions),
    cookie: {}
  };

  app.use(session(sessionOptions));
};

export default sessionMiddleware;
