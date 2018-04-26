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
  console.log('GET_ORDERS');
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
  const request = Observable.of({ Message: 'Pedido recibido' });
  return request;
};

/**
 * Creates a request to deliver a list of order.
 * @param {String} username -> The distributor username.
 * @param {Array} orders -> The list of orders to deliver.
 * @returns {Observable} -> The request.
 */
const deliverOrdersRequest = () => (
  Observable.of({ Message: 'Pedidos recibidos' })
);

/**
 * Creates a request to notify a not delivered order.
 * @param {Number} numOrder -> The number of the order.
 * @param {String} message -> The message of the notification.
 * @returns {Observable} -> The request.
 */
const notifyNotDeliveredOrder = () => {
  const request = Observable.of({ Message: 'Notificacion recibida' });
  return request;
};

export default {
  deliverOrderRequest,
  deliverOrdersRequest,
  getOrdersToDeliverRequest,
  notifyNotDeliveredOrder
};
