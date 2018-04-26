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
import { ARGS_ABSENCE } from '../../../shared/constants/messages';


const callGetOrdersToDeliver = (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  const data = deliverOrdersServices
    .getOrdersToDeliverRequest(username);

  return res.status(responses.OK).send({ data });
};

const callDeliverOrder = (req, res) => {
  const {
    numOrder,
    urlCode,
    urlPackage
  } = req.body;

  const requiredParams = ['numOrder'];
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
        // There was an external server error.
        return res
          .status(responses.ERROR)
          .send({ message: err.Message });
      }
    );
};

/**
 * Controller to deliver a list of orders.
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const callDeliverOrders = (req, res) => {
  console.log('ORDERS:', req.body.orders);
  const requiredParams = ['username', 'orders'];

  if (!validateParams(req.body, requiredParams)) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return res
    .status(responses.OK)
    .send({ message: 'OK' });
};

const callNotifyNotDeliveredOrder = (req, res) => {
  const requiredParams = ['numOrder', 'message'];

  if (!validateParams(req.body, requiredParams)) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return res.status(responses.OK).send({ message: 'OK' });
};

export default {
  callDeliverOrder,
  callDeliverOrders,
  callGetOrdersToDeliver,
  callNotifyNotDeliveredOrder
};
