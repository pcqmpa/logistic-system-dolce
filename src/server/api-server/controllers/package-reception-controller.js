/**
 * Module with package reception controllers.
 * @module src/server/api-server/controllers/package-reception-controller
 */
// Services.
import { packageReceptionServices } from '../services';

// Constants.
import * as responses from '../../constants/responses';
import {
  ARGS_ABSENCE,
  EXTERNAL_SERVER_ERROR
} from '../../../shared/constants/messages';

const callGetOrdersList = (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return packageReceptionServices
    .getOrdersListRequest(username)
    .subscribe(
      data => (
        // Responds with the transporter master list.
        res.status(responses.OK).send({ data })
      ),
      err => (
        res.status(responses.ERROR).send({
          err,
          serverMessage: EXTERNAL_SERVER_ERROR
        })
      )
    );
};

const callCheckOrder = (req, res) => {
  const { numOrder, observation } = req.body;
  if (!numOrder) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }
  return packageReceptionServices
    .checkOrderRequest(numOrder, observation)
      .subscribe(
        response => (
          // The user was successfully assigned.
          res
            .status(responses.OK)
            .send({ message: response.Message })
        ),
        err => (
          // There was an external server error.
          res
            .status(responses.ERROR)
            .send({ err: err.Message })
        )
      );
};

export default {
  callGetOrdersList,
  callCheckOrder
};
