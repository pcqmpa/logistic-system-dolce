/**
 * Module with the services to assign orders to a distributor.
 * @module src/server/api-server/services/assign-orders-services
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

// API Creators.
// import {
//   getOrdersToAssign,
//   assignOrderToDistributor
// } from './service-creators';

// Utils.
// import { streams } from '../../utils/';

// Lib.
// import serializer from '../../../shared/lib/serializer';

// Constants.
// import { GET, POST } from '../../../shared/constants/types';

// TODO: Add the mocked services.

/**
 * Creates a request consulting the list orders to
 * assign to a distributor assigned to a transporter.
 * @param {String} username -> The transporter username.
 * @returns {Symbol.Observable} -> The request.
 */
const getOrdersToAssignRequest = () => (
  // streams.fromAjaxRequest(GET, getOrdersToAssign(username))
  Observable.empty()
);

/**
 * Creates a request to assign a single order to a distributor.
 * @param {String} username -> The distributor username.
 * @param {String} idTransporter -> The id of the transporter user.
 * @param {Number} numOrder -> The number of the order.
 * @returns {Symbol.Observable} -> The request.
 */
const assignOrderToDistributorRequest = () => (
  // streams.fromAjaxRequest(
  //   POST,
  //   assignOrderToDistributor(),
  //   serializer.toOrderToAssign({
  //     username,
  //     idTransporter,
  //     numOrder
  //   })
  // )
  Observable.empty()
);

export default {
  getOrdersToAssignRequest,
  assignOrderToDistributorRequest
};
