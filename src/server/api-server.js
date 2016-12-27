/**
 * Module with the api server config.
 * @module src/server/api-server
 */
// Node.
import Express from 'express';

// App Config.
import { env } from '../../config/';

// Middlewares.
import sessionMiddleware from './middlewares/session-middleware';

// Utils.
import { Log } from './utils/';

// Controllers.
import { securityController } from './api-server/controllers/';

// Constants.
import * as messages from '../shared/constants/messages';


// Express server.
const app = new Express();

//
// API Configuration.
// -----------------------------------------------------------------------------

// Setup session.
sessionMiddleware(app);

//
// API Services.
// -----------------------------------------------------------------------------
app.get('/api/callFetchUser', securityController.callFetchUser);

app.post('/api/destroyUserSession', securityController.destroyUserSession);


//
// API Initialize.
// -----------------------------------------------------------------------------
app.listen(env.API_PORT, (err) => {
  if (err) {
    Log.error(err);
  } else {
    Log.info(`${messages.API_SIGNAL} ${env.API_PORT}`);
  }
});
