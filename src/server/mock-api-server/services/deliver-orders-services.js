/**
 * Module with the services for a distributor deliver orders.
 * @module src/server/api-server/services/deliver-orders-services
 */
// Rxjs.
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

// Utils.
import mockedData from '../../utils/mocked-data';

/**
 * Creates a request consulting the list orders that
 * the user distributor is going to deliver.
 * @param {String} username -> The distributor username.
 * @returns {Symbol.Observable} -> The request.
 */
const getOrdersToDeliverRequest = () => {
  const { orders } = mockedData;
  return orders;
};

/**
 * Creates a request to deliver a order.
 * @param {Number} numOrder -> The number of the order.
 * @param {String} urlPicture -> The url of this specific order picture.
 * @param {String} urlCode -> The url of the order's code picture.
 * @returns {Symbol.Observable} -> The request.
 */
const deliverOrderRequest = () => {
  const request = Observable.of({ Message: 'Pedido recivido' });
  return request;
};

export default {
  deliverOrderRequest,
  getOrdersToDeliverRequest
};
