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
  username => (`${API_SERVICE_URL}/api/Usuarios${username && `?strUsuario=${username}`}`);

/**
 * Service to add a new user.
 * @returns {String} -> With the URL request.
 */
export const addUser = () => (`${API_SERVICE_URL}/api/Seguridad`);

//
// Tramsporter Services.
// -----------------------------------------------------------------------------

/**
 * Service to get a list of transporters.
 * @returns {String} -> With the URL request.
 */
export const getTransporters = () => (`${API_SERVICE_URL}/api/Trasportador`);
