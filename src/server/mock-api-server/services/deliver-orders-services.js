/**
 * Module with the services for a distributor deliver orders.
 * @module src/server/api-server/services/deliver-orders-services
 */
// Rxjs.
import { Observable } from 'rxjs';
import 'rxjs/add/observable/empty';

// API Creators.
// import {
//   deliverOrder,
//   getOrdersToDeliver
// } from './service-creators';

// Utils.
// import { streams } from '../../utils/';

// Lib.
// import serializer from '../../../shared/lib/serializer';

// Constants.
// import { GET, POST } from '../../../shared/constants/types';

// TODO: Add the mocked services.

/**
 * Creates a request consulting the list orders that
 * the user distributor is going to deliver.
 * @param {String} username -> The distributor username.
 * @returns {Symbol.Observable} -> The request.
 */
const getOrdersToDeliverRequest = () => (
  // streams.fromAjaxRequest(GET, getOrdersToDeliver(username))
  Observable.empty()
);

/**
 * Creates a request to deliver a order.
 * @param {Number} numOrder -> The number of the order.
 * @param {String} urlPicture -> The url of this specific order picture.
 * @param {String} urlCode -> The url of the order's code picture.
 * @returns {Symbol.Observable} -> The request.
 */
const deliverOrderRequest = () => (
  // streams.fromAjaxRequest(
  //   POST,
  //   deliverOrder(),
  //   serializer.toOrderToDeliver({
  //     numOrder,
  //     urlPicture,
  //     urlCode
  //   })
  // )
  Observable.empty()
);

export default {
  deliverOrderRequest,
  getOrdersToDeliverRequest
};
