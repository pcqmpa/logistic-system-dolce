/**
 * Module with the mocked security controllers.
 * @module src/server/mock-api-server/controllers/security-controller
 */
// Node.
// import jwt from 'jsonwebtoken';

// Services.
import { securityServices } from '../services/';

// Constants.
import * as responses from '../../constants/responses';
import { INVALID_USER } from '../../../shared/constants/messages';

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

export default { callFetchUser, destroyUserSession };
