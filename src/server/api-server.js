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
  securityController,
  userController,
  transporterController
} from './api-server/controllers/';

// Constants.
import * as messages from '../shared/constants/messages';


// Express server.
const app = new Express();

//
// API Configuration.
// -----------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup session.
sessionMiddleware(app);

//
// API Services.
// -----------------------------------------------------------------------------

// Security.
app.get('/api/callFetchUser', securityController.callFetchUser);
app.post('/api/destroyUserSession', securityController.destroyUserSession);

// User.
app.get('/api/callConsultUsers', userController.callConsultUsers);
app.post('/api/callAddUser', userController.callAddUser);

// Transporter.
app.get(
  '/api/callGetTransporters',
  transporterController.callGetTransporters
);
app.post(
  '/api/callAssignTransporter',
  transporterController.callAssignTransporter
);
app.post(
  '/api/callAssignDistributor',
  transporterController.callAssignDistributor
);

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
