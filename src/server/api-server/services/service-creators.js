/**
 * Module with the external api services.
 * @module src/server/api-services/services/service-creators
 */
import { API_SERVICE_URL } from '../../../../config/';

//
// Security Services.
// -----------------------------------------------------------------------------

/**
 * Service to fetch a user with the login from input.
 * @param {Object} payload -> Args to make te request.
 * @property {String} username -> The username.
 * @property {String} password -> The user password.
 * @returns {String} -> With the URL request.
 */
export const fetchUser = ({ username, password }) =>
  (`${API_SERVICE_URL}/api/Seguridad?usuario=${username}&password=${password}`);

//
// User Services.
// -----------------------------------------------------------------------------

/**
 * Service to consult a user or a list of users.
 * @param {String} username -> A specific username(optional).
 * @returns {String} -> With the URL request.
 */
export const consultUsers = username =>
  (`${API_SERVICE_URL}/api/Usuarios${(username) ? `?strUsuario=${username}` : ''}`);

/**
 * Service to add a new user.
 * @returns {String} -> With the URL request.
 */
export const addUser = () => (`${API_SERVICE_URL}/api/Seguridad`);

//
// Logistic Types Services.
// -----------------------------------------------------------------------------

/**
 * Service to consult the logistic types.
 * @returns {String} -> With the URL request.
 */
export const consultLogisticTypes = () => (`${API_SERVICE_URL}/api/TipoLogistica`);

//
// Transporter Services.
// -----------------------------------------------------------------------------

/**
 * Service to get a list of transporters.
 * @returns {String} -> With the URL request.
 */
export const getTransporters = () => (`${API_SERVICE_URL}/api/Trasportador`);

/**
 * Service to asign a transporter master to a transporter user.
 * @returns {String} -> With the URL request.
 */
export const assignTransporter = () => (`${API_SERVICE_URL}/api/Trasportador`);

/**
 * Service to asign a transporter master to a transporter user.
 * @returns {String} -> With the URL request.
 */
export const assignDistributor = () => (`${API_SERVICE_URL}/api/Usuarios`);

//
// Package Reception Services.
// -----------------------------------------------------------------------------

/**
 * Service to get a list of current orders from a transporter.
 * @param {String} username -> The transporte username.
 * @returns {String} -> With the URL request.
 */
export const getOrdersList = username =>
  (`${API_SERVICE_URL}/api/PedidosTrasportador?strUsuario=${username}`);

/**
 * Service to check transporter's orders arrival.
 * @returns {String} -> With the URL request.
 */
export const checkOrder = () => (`${API_SERVICE_URL}/api/PedidosTrasportador`);

//
// Assign Orders Services.
// -----------------------------------------------------------------------------

/**
 * Service to get the transporter orders to assign to a distributor.
 * @param {String} username -> The transporter username.
 * @returns {String} -> With the URL request.
 */
export const getOrdersToAssign = username =>
  (`${API_SERVICE_URL}/api/PedidosDistribuidor?strUsuario=${username}`);

/**
 * Service to assign an order to a specific distributor.
 * @returns {String} -> With the URL request.
 */
export const assignOrderToDistributor = () =>
  (`${API_SERVICE_URL}/api/PedidosDistribuidor`);

//
// Orders Delivery Services.
// -----------------------------------------------------------------------------

/**
 * Service to get the list of distributor's orders to deliver.
 * @param {String} username -> The distributor username.
 * @returns {String} -> With the URL request.
 */
export const getOrdersToDeliver = username =>
  (`${API_SERVICE_URL}/api/EntregaPedido?strUsuario=${username}`);

/**
 * Service to confirm the delivery of a order.
 * @returns {String} -> With the URL request.
 */
export const deliverOrder = (numOrder, urlPackage, urlCode) => (
  `${API_SERVICE_URL}/api/EntregaPedido?numPedido=${numOrder}&urlImagen=${urlPackage}&urlCod=${urlCode}`
);
