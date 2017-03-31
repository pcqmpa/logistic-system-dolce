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

// Setup session.
sessionMiddleware(app);

//
// API Services.
// -----------------------------------------------------------------------------

// Security.
app.get(
  '/api/callFetchUser',
  securityController.callFetchUser
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
