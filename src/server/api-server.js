/**
 * Module with the api server config.
 * @module src/server/api-server
 */
import Express from 'express';
import jwt from 'jsonwebtoken';

// App Config.
import { env, TOKEN_SECRET } from '../../config/config';

// Middlewares.
import sessionMiddleware from './middlewares/session-middleware';

// Services.
import { fetchUserRequest } from './api-services/';

// Utils.
import { Log } from './utils/';

// Constants.
import * as responses from './constants/responses';
import * as values from './constants/values';
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
app.get('/api/callFetchUser', (req, res) => {
  fetchUserRequest(req.query)
    .subscribe(
      (data) => {
        const { session } = req;
        const {
          username,
          password,
          rememberMe
        } = req.query;
        const user = {
          username,
          password,
          ...data
        };
        const tokenOptions = { user };

        // Set expiration if the remember flag is false.
        if (!rememberMe) {
          tokenOptions.expiresIn = values.TOKEN_EXPIRATION;
        }
        const token = jwt.sign(tokenOptions, TOKEN_SECRET);
        // Save token in the session object.
        session.token = token;

        // Responds with the user data
        res.status(responses.OK).send({ user });
      },
      () => {
        res.status(responses.UNAUTHORIZED).send({
          loginFailed: true,
          message: messages.INVALID_USER
        });
      }
    );
});

app.post('/api/destroyUserSession', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(responses.ERROR).send({ err });
    }

    res.status(responses.OK).send({
      userLogout: true
    });
  });
});


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
