/**
 * Module with the user services.
 * @module src/server/api-server/services/security-services
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
// API Creators.
// import { consultUsers, addUser } from './service-creators';

// Streams.
// import { streams } from '../../utils/';

// Constants.
// import { GET, POST } from '../../../shared/constants/types';

// TODO: Add the mocked services.

/**
 * Creates a request consulting the list of users or a specific user.
 * @param {String} username -> The user to be consulted.
 * @returns {Observable} -> The request.
 */
const consultUsersRequest = () => (
  // streams.fromAjaxRequest(GET, consultUsers(username))
  Observable.empty()
);

/**
 * Makes a request to add a user with the data passed.
 * @param {Object} payload -> The user data.
 * @returns {Observable} -> The request.
 */
const addUserRequest = () => (
  // streams.fromAjaxRequest(
  //   POST,
  //   addUser(),
  //   payload
  // )
  Observable.empty()
);

export default {
  consultUsersRequest,
  addUserRequest
};
