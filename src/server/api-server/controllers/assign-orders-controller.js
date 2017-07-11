/**
 * Module with the controllers to assign orders to a ditributor.
 * @module src/server/api-server/controllers/assign-orders-controller
 */
// Services.
import { assignOrdersServices } from '../services';

// Constants.
import * as responses from '../../constants/responses';
import {
  ARGS_ABSENCE,
  EXTERNAL_SERVER_ERROR
} from '../../../shared/constants/messages';

const callGetOrdersToAssign = (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return assignOrdersServices
    .getOrdersToAssignRequest(username)
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

const callAssignOrderToDistributor = (req, res) => {
  const {
    username,
    idTransporter,
    numOrder
  } = req.body;
  if (!numOrder) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }
  return assignOrdersServices
    .assignOrderToDistributorRequest(
      username,
      idTransporter,
      numOrder
    ).subscribe(
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
  callGetOrdersToAssign,
  callAssignOrderToDistributor
};
