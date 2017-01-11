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
import { INVALID_USER } from '../../../shared/constants/messages';

const callFetchUser = (req, res) => {
  authUser(req.query)
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
          ...data.user
        };
        const tokenOptions = { user };

        // Set expiration if the remember flag is false.
        if (!rememberMe) {
          tokenOptions.expiresIn = TOKEN_EXPIRATION;
        }
        const token = jwt.sign(tokenOptions, TOKEN_SECRET);
        // Save token in the session object.
        session.token = token;

        // Responds with the user data
        res.status(responses.OK).send({ ...data, user });
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

export default { callFetchUser, destroyUserSession };
