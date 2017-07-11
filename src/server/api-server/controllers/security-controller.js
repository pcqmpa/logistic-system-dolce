/**
 * Module with the security controllers.
 * @module src/server/api-server/controllers/security-controller
 */
// Node.
import jwt from 'jsonwebtoken';

// App Config.
import { TOKEN_SECRET } from '../../../../config/';

// Services.
import { authUser } from '../streams/';

// Constants.
import * as responses from '../../constants/responses';
import { TOKEN_EXPIRATION } from '../../constants/values';
import { INVALID_USER, SYSTEM_ERROR } from '../../../shared/constants/messages';

const callAuthMobileUser = (req, res) => {
  authUser(req.body)
    .subscribe(
      (data) => {
        const { user } = data;
        const {
          username,
          password
        } = req.query;
        const userData = {
          username,
          password,
          ...user
        };
        const tokenOptions = {
          expiresIn: TOKEN_EXPIRATION
        };

        // Sign token with user data.
        jwt.sign(
          userData,
          TOKEN_SECRET,
          tokenOptions,
          (err, token) => {
            if (err) {
              return res
                .status(responses.ERROR)
                .send({ message: SYSTEM_ERROR });
            }

            // Responds with the user data and token.
            return res
              .status(responses.OK)
              .send({ ...data, user: userData, token });
          }
        );
      },
      () => (
        res
          .status(responses.ERROR)
          .send({ message: INVALID_USER })
      )
    );
};

const callFetchUser = (req, res) => {
  authUser(req.query)
    .subscribe(
      (data) => {
        const { session } = req;
        const { user } = data;
        const {
          username,
          password,
          rememberMe
        } = req.query;
        const userData = {
          username,
          password,
          ...user
        };
        const tokenOptions = {};

        // Set expiration if the remember flag is false.
        if (!rememberMe) {
          tokenOptions.expiresIn = TOKEN_EXPIRATION;
        }

        jwt.sign(
          userData,
          TOKEN_SECRET,
          tokenOptions,
          (err, token) => {
            if (err) {
              return res
                .status(responses.ERROR)
                .send({ message: SYSTEM_ERROR });
            }

            // Save token in the session object.
            session.token = token;

            // Responds with the user data
            return res
              .status(responses.OK)
              .send({ ...data, user: userData });
          }
        );
      },
      () => {
        res.status(responses.UNAUTHORIZED).send({
          loginFailed: true,
          message: INVALID_USER
        });
      }
    );
};

const destroyUserSession = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(responses.ERROR).send({ err });
    }

    res.status(responses.OK).send({
      userLogout: true
    });
  });
};

export default {
  callAuthMobileUser,
  callFetchUser,
  destroyUserSession
};
