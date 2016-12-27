/**
 * Module with the security controllers.
 * @module src/server/api-server/controllers/security-controller
 */
// Services.
import { userServices } from '../services/';

// Constants.
import * as responses from '../../constants/responses';
import {
  ARGS_ABSENCE,
  EXTERNAL_SERVER_ERROR
} from '../../../shared/constants/messages';

const callConsultUsers = (req, res) => {
  userServices
    .consultUsersRequest(req.query.username)
      .subscribe(
        (data) => {
          // Responds with the user data
          res.status(responses.OK).send({ data });
        },
        () => {
          res.status(responses.ERROR).send({
            message: EXTERNAL_SERVER_ERROR
          });
        }
      );
};

const callAddUser = (req, res) => {
  if (!req.query.user) {
    return res
      .status(responses.ERROR)
      .send({ meessage: ARGS_ABSENCE });
  }

  return userServices
    .addUserRequest(req.query.user)
      .subscribe(
        (message) => {
          // The user was created succesfully.
          res
            .status(responses.OK)
            .send({ message });
        },
        (err) => {
          // There was an external error.
          res
            .status(responses.ERROR)
            .send({ message: err });
        }
      );
};

export default { callConsultUsers, callAddUser };
