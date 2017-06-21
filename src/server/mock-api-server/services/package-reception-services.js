/**
 * Module with the package reception services.
 * @module src/server/api-server/services/package-reception-services
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

// API Creators.
// import {
//   checkOrder,
//   getOrdersList
// } from './service-creators';

// Utils.
// import { streams } from '../../utils/';

// Constants.
// import { GET, POST } from '../../../shared/constants/types';

// TODO: Add the mocked services.

/**
 * Creates a request consulting the list of transporter's orders.
 * @param {String} username -> The transporter username.
 * @returns {Symbol.Observable} -> The request.
 */
const getOrdersListRequest = () => (
  // streams.fromAjaxRequest(GET, getOrdersList(username))
  Observable.empty()
);

/**
 * Creates a request to check a single order.
 * @param {Number} numOrder -> The order number.
 * @param {String} observation -> The observation related to the order.
 * @returns {Symbol.Observable} -> The request.
 */
const checkOrderRequest = () => (
  // streams.fromAjaxRequest(POST, checkOrder(), {
  //   numPedido: numOrder,
  //   strObservacion: observation || ''
  // })
  Observable.empty()
);

export default {
  checkOrderRequest,
  getOrdersListRequest
};
