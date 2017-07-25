/**
 * Module with the services for a distributor deliver orders.
 * @module src/server/api-server/services/deliver-orders-services
 */
// API Creators.
import {
  deliverOrder,
  getOrdersToDeliver,
  notDelivered
} from './service-creators';

// Utils.
import { streams } from '../../utils/';

// Lib.
// import serializer from '../../../shared/lib/serializer';

// Constants.
import { GET, POST } from '../../../shared/constants/types';

/**
 * Creates a request consulting the list orders that
 * the user distributor is going to deliver.
 * @param {String} username -> The distributor username.
 * @returns {Observable} -> The request.
 */
const getOrdersToDeliverRequest = username => (
  streams.fromAjaxRequest(GET, getOrdersToDeliver(username))
);

/**
 * Creates a request to deliver a order.
 * @param {Number} numOrder -> The number of the order.
 * @param {String} urlPicture -> The url of this specific order picture.
 * @param {String} urlCode -> The url of the order's code picture.
 * @returns {Observable} -> The request.
 */
const deliverOrderRequest = (
  numOrder,
  urlPicture,
  urlCode
) => (
  streams.fromAjaxRequest(
    POST,
    deliverOrder(numOrder, urlPicture, urlCode)
  )
);

/**
 * Creates a request to notify a not delivered order.
 * @param {Number} numOrder -> The number of the order.
 * @param {String} message -> The message of the notification.
 * @returns {Observable} -> The request.
 */
const notifyNotDeliveredOrder = (numOrder, message) => {
  const request = streams.fromAjaxRequest(
    POST,
    notDelivered(numOrder, message)
  );
  return request;
};

export default {
  deliverOrderRequest,
  getOrdersToDeliverRequest,
  notifyNotDeliveredOrder
};
