/**
 * Module with the mocked security controllers.
 * @module src/server/mock-api-server/controllers/security-controller
 */
// Node.
import jwt from 'jsonwebtoken';

// Services.
import { securityServices } from '../services/';

// App Config.
import { TOKEN_SECRET } from '../../../../config/';

// Constants.
import * as responses from '../../constants/responses';
import { INVALID_USER } from '../../../shared/constants/messages';
import {
  TOKEN_ALGORITHM,
  TOKEN_EXPIRATION
} from '../../constants/values';

const callAuthMobileUser = (req, res) => {
  const { username } = req.body;
  const data = securityServices.fetchUserRequest({ username });
  const tokenOptions = {
    ...data,
    expiresIn: TOKEN_EXPIRATION
  };

  jwt.sign(
    tokenOptions,
    TOKEN_SECRET,
    { algorithm: TOKEN_ALGORITHM },
    (err, token) => {
      if (err) {
        return res
          .status(responses.ERROR)
          .send({ message: INVALID_USER });
      }

      return res
        .status(responses.OK)
        .send({ ...data, token });
    }
  );
};

const callFetchUser = (req, res) => {
  const { username } = req.query;
  const response = securityServices.fetchUserRequest({ username });

  if (response) {
    return res
      .status(responses.OK)
      .send(response);
  }

  return res
    .status(responses.ERROR)
    .send({ message: INVALID_USER });
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
