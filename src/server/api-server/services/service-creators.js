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
export const fetchUser =
  ({ username, password }) =>
    (`${API_SERVICE_URL}/api/Seguridad?usuario=${username}&password=${password}&JSOPRequest=?`);

//
// User Services.
// -----------------------------------------------------------------------------

/**
 * Service to consult a user or a list of users.
 * @param {String} username -> A specific username(optional).
 * @returns {String} -> With the URL request.
 */
export const consultUsers =
  username => (`${API_SERVICE_URL}/api/Usuarios${(username) ? `?strUsuario=${username}` : ''}`);

/**
 * Service to add a new user.
 * @returns {String} -> With the URL request.
 */
export const addUser = () => (`${API_SERVICE_URL}/api/Seguridad`);

//
// Logitic Types Services.
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
 * @param {String} idUser -> The transporter user id.
 * @param {String} idTransporter -> The transporter master id.
 * @returns {String} -> With the URL request.
 */
export const assignTransporter = (idUser, idTransporter) =>
  (`${API_SERVICE_URL}/api/Trasportador?idUsuario=${idUser}&idTranportador=${idTransporter}`);

/**
 * Service to asign a transporter master to a transporter user.
 * @param {String} idTransporter -> The transporter user id.
 * @param {String} idDistributor -> The distributor id.
 * @returns {String} -> With the URL request.
 */
export const assignDistributor = (idTransporter, idDistributor) =>
  (`${API_SERVICE_URL}/api/Usuarios?idTransportista=${idTransporter}&idDistribuidor=${idDistributor}`);
