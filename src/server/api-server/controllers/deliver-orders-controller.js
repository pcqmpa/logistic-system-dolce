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
      if (typeof orders === 'string') {
        return [];
      }
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
    orderType,
    urlCode,
    urlPackage
  } = req.body;

  const requiredParams = ['numOrder', 'orderType', 'urlPackage', 'urlCode'];
  if (!validateParams(req.body, requiredParams)) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return deliverOrdersServices
    .deliverOrderRequest(numOrder, orderType, urlPackage, urlCode)
    .subscribe(
      (response) => {
        // The order was successfully delivered.
        return res
          .status(responses.OK)
          .send({ message: response.Message });
      },
      (err) => {
        console.log(err); // eslint-disable-line
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
  const requiredParams = ['username', 'orders'];

  if (!validateParams(req.body, requiredParams)) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  const { username, orders } = req.body;

  return deliverOrdersServices
    .deliverOrdersRequest(username, orders)
    .subscribe(
      (response) => {
        console.log(response); // eslint-disable-line
        return res
          .status(responses.OK)
          .send({ message: response.Message });
      },
      (err) => {
        console.log(err); // eslint-disable-line
        return res
          .status(responses.ERROR)
          .send({ message: err.Message });
      }
    );
};

const callNotifyNotDeliveredOrder = (req, res) => {
  const requiredParams = ['numOrder', 'message'];

  if (!validateParams(req.body, requiredParams)) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  const { numOrder, message } = req.body;

  return deliverOrdersServices.notifyNotDeliveredOrder(numOrder, message)
    .subscribe(
      (response) => {
        return res
          .status(responses.OK)
          .send({ message: response.Message });
      },
      (err) => {
        console.log(err); // eslint-disable-line
        // There was an external server error.
        return res
          .status(responses.ERROR)
          .send({ message: err.Message });
      }
    );
};

export default {
  callDeliverOrder,
  callDeliverOrders,
  callGetOrdersToDeliver,
  callNotifyNotDeliveredOrder
};
