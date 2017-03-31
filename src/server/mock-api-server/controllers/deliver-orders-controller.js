/**
 * Module with the controllers to deliver orders.
 * @module src/server/api-server/controllers/deliver-orders-controller
 */
// Services.
import { deliverOrdersServices } from '../services';

// Streams.
import { streams } from '../../utils/';

// Config.
import { env } from '../../../../config/';
import { PICTURES_DIR } from '../../../../config/paths';

// Constants.
import * as responses from '../../constants/responses';
import {
  ARGS_ABSENCE,
  EXTERNAL_SERVER_ERROR
} from '../../../shared/constants/messages';


const callGetOrdersToDeliver = (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return deliverOrdersServices
    .getOrdersToDeliverRequest(username)
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

const callDeliverOrder = (req, res) => {
  const {
    numOrder,
    urlPicture,
    urlCode
  } = req.body;
  if (!numOrder) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }
  return deliverOrdersServices
    .deliverOrderRequest(
      numOrder,
      urlPicture,
      urlCode
    ).subscribe(
        response => (
          // The order was successfully delivered.
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
  callDeliverOrder,
  callGetOrdersToDeliver
};
