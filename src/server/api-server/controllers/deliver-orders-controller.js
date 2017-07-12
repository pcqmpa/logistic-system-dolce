/**
 * Module with the controllers to deliver orders.
 * @module src/server/api-server/controllers/deliver-orders-controller
 */
// Services.
import { deliverOrdersServices } from '../services';

// Utils.
import { validateParams } from '../../utils/validations';

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
    .map((ordersString) => {
      const orders = JSON.parse(ordersString);
      return orders;
    })
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
    urlCode,
    urlPackage
  } = req.body;

  const requiredParams = ['numOrder', 'urlPackage', 'urlCode'];
  if (!validateParams(req.body, requiredParams)) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return deliverOrdersServices
    .deliverOrderRequest(numOrder, urlPackage, urlCode)
    .subscribe(
      (response) => {
        // The order was successfully delivered.
        return res
          .status(responses.OK)
          .send({ message: response.Message });
      },
      (err) => {
        console.log(err);
        // There was an external server error.
        return res
          .status(responses.ERROR)
          .send({ message: err.Message });
      }
    );
};

export default {
  callDeliverOrder,
  callGetOrdersToDeliver
};
