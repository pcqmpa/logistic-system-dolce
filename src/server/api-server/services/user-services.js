/**
 * Module with the security external services.
 * @module src/server/api-server/services/security-services
 */
// API Creators.
import { consultUsers, addUser } from './service-creators';

// Streams.
import { streams } from '../../utils/';

// Constants.
import { GET, POST } from '../../../shared/constants/types';

/**
 * Creates a request consulting the list of users or a specific user.
 * @param {String} username -> The user to be consulted.
 * @returns {Observable} -> The request.
 */
const consultUsersRequest = username => (
  streams.fromAjaxRequest(GET, consultUsers(username))
);

/**
 * Makes a request to add a user with the data passed.
 * @param {Object} payload -> The user data.
 * @returns {Observable} -> The request.
 */
const addUserRequest = payload => (
  streams.fromAjaxRequest(
    POST,
    addUser(),
    payload
  )
);

export default {
  consultUsersRequest,
  addUserRequest
};
