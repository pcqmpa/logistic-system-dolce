/**
 * Module with the api server config.
 * @module src/server/api-server
 */
// Node.
import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

// App Config.
import { env } from '../../config/';

// Middlewares.
import authMiddleware from './middlewares/auth-middleware';
import sessionMiddleware from './middlewares/session-middleware';

// Utils.
import { Log } from './utils/';

// Controllers.
import {
  securityController,
  userController,
  transporterController,
  packageReceptionController,
  assignOrdersController,
  deliverOrdersController,
  pictureStoreController
} from './api-server/controllers/';

// Constants.
import * as messages from '../shared/constants/messages';


// Express server.
const app = new Express();
const upload = multer();

app.use(cors());

//
// API Configuration.
// -----------------------------------------------------------------------------
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Middlewares.

// I. session.
sessionMiddleware(app);
// II. Authentication.
authMiddleware(app);


//
// API Services.
// -----------------------------------------------------------------------------

// Security.
app.post('/api/callAuthMobileUser', securityController.callAuthMobileUser);
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

// Package Reception.
app.get(
  '/api/callGetOrdersList',
  packageReceptionController.callGetOrdersList
);

app.post(
  '/api/callCheckOrder',
  packageReceptionController.callCheckOrder
);

// Assign Orders To Distributor.
app.get(
  '/api/callGetOrdersToAssign',
  assignOrdersController.callGetOrdersToAssign
);

app.post(
  '/api/callAssignOrderToDistributor',
  assignOrdersController.callAssignOrderToDistributor
);

// The Deliver of Orders.
app.get(
  '/api/callGetOrdersToDeliver',
  deliverOrdersController.callGetOrdersToDeliver
);

app.post(
  '/api/callDeliverOrder',
  deliverOrdersController.callDeliverOrder
);

app.post(
  '/api/callDeliverOrders',
  deliverOrdersController.callDeliverOrders
);

app.post(
  '/api/callNotifyNotDeliveredOrder',
  deliverOrdersController.callNotifyNotDeliveredOrder
);

// The Picture Store Services.
app.get(
  '/api/picture/:pictureName',
  pictureStoreController.getPicture
);

app.post(
  '/api/savePicture',
  upload.fields([{ name: 'picture', maxCount: 1 }]),
  pictureStoreController.savePicture
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
