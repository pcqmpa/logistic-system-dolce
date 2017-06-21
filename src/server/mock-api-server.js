/**
 * Module with the api server config.
 * @module src/server/api-server
 */
// Node.
import Express from 'express';
import bodyParser from 'body-parser';

// App Config.
import { env } from '../../config/';

// Middlewares.
import authMiddleware from './middlewares/auth-middleware';
import sessionMiddleware from './middlewares/session-middleware';

// Utils.
import { Log } from './utils/';

// Controllers.
import {
  securityController
} from './mock-api-server/controllers/';

// Constants.
import * as messages from '../shared/constants/messages';


// Express server.
const app = new Express();

//
// API Configuration.
// -----------------------------------------------------------------------------
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middlewares.

// I. session.
sessionMiddleware(app);
// II. Authentication.
authMiddleware(app);

//
// API Services.
// -----------------------------------------------------------------------------

// Security.
app.get(
  '/api/callFetchUser',
  securityController.callFetchUser
);

app.post(
  '/api/callAuthMobileUser',
  securityController.callAuthMobileUser
);

//
// API Initialize.
// -----------------------------------------------------------------------------
app.listen(env.MOCK_API_PORT, (err) => {
  if (err) {
    Log.error(err);
  } else {
    Log.info(`${messages.MOCK_API_SIGNAL} ${env.MOCK_API_PORT}`);
  }
});
