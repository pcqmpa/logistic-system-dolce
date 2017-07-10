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
  deliverOrdersController,
  pictureStoreController,
  securityController
} from './mock-api-server/controllers/';

// Constants.
import * as messages from '../shared/constants/messages';


// Express server.
const app = new Express();
const upload = multer();

app.use(cors());

//
// API Configuration.
// -----------------------------------------------------------------------------
app.use(bodyParser.raw({ limit: '100mb' }));
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
app.get(
  '/api/callFetchUser',
  securityController.callFetchUser
);

app.post(
  '/api/callAuthMobileUser',
  securityController.callAuthMobileUser
);

// Orders Delivery.
app.get(
  '/api/callGetOrdersToDeliver',
  deliverOrdersController.callGetOrdersToDeliver
);

app.post(
  '/api/callDeliverOrder',
  deliverOrdersController.callDeliverOrder
);

// The Picture Store Services.
app.post(
  '/api/savePicture',
  upload.fields([{ name: 'picture', maxCount: 1 }]),
  pictureStoreController.savePicture
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
