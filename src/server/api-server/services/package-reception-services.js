/**
 * Module with the package reception services.
 * @module src/server/api-server/services/package-reception-services
 */
// API Creators.
import {
  checkOrder,
  getOrdersList
} from './service-creators';

// Utils.
import { streams } from '../../utils/';

// Constants.
import { GET, POST } from '../../../shared/constants/types';

/**
 * Creates a request consulting the list of transporter's orders.
 * @param {String} username -> The transporter username.
 * @returns {Symbol.Observable} -> The request.
 */
const getOrdersListRequest = username => (
  streams.fromAjaxRequest(GET, getOrdersList(username))
);

/**
 * Creates a request to check a single order.
 * @param {Number} numOrder -> The order number.
 * @param {String} observation -> The observation related to the order.
 * @returns {Symbol.Observable} -> The request.
 */
const checkOrderRequest = (numOrder, observation) => (
  streams.fromAjaxRequest(POST, checkOrder(), {
    numPedido: numOrder,
    strObservacion: observation || ''
  })
);

export default {
  checkOrderRequest,
  getOrdersListRequest
};
