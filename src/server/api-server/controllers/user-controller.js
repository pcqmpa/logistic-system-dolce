/**
 * Module with the security controllers.
 * @module src/server/api-server/controllers/security-controller
 */
// Services.
import { userServices } from '../services/';

// Utils.
import { Log } from '../../utils/';

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
            err: EXTERNAL_SERVER_ERROR
          });
        }
      );
};

const callAddUser = (req, res) => {
  const user = req.body;
  if (!user.StrUsuario) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return userServices
    .addUserRequest(user)
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
            .send({ err });
        }
      );
};

export default { callConsultUsers, callAddUser };
