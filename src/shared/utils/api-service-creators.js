/**
 * Module with the app api services urls.
 * @module src/shared/utils/api-service-creators
 */

//
// Security Services.
// -----------------------------------------------------------------------------

/**
 * Service to fetch the user from the main server.
 * @param {Object} payload -> with the username and password.
 * @returns {String} -> with the api url.
 */
export const callFetchUser =
  ({ username, password }) =>
    (`/api/callFetchUser?username=${username}&password=${password}`);

/** 
 * Service to destroy the current user session.
 * @returns {String} -> with the api url.
 */
export const destroyUserSession = () => ('/api/destroyUserSession');

//
// User Services.
// -----------------------------------------------------------------------------

/**
 * Service to consult a user or a list of users.
 * @param {String} username -> A specific username(optional).
 * @returns {String} -> With the URL request.
 */
export const callConsultUsers =
  username => (`/api/callConsultUsers${username && `?strUsuario=${username}`}`);

/**
 * Service to add a new user.
 * @returns {String} -> With the URL request.
 */
export const callAddUser = () => ('/api/callAddUser');

