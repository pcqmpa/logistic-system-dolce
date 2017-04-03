// TODO: Think a better name and test this solution.
/**
 * Module with a stream to authenticate user and init state.
 * @module src/server/api-server/streams/auth-user
 */
// Rxjs.
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';

// Services.
import { securityServices } from '../services';
import { initState } from './';

/**
 * Stream that validates user.
 * @returns {Symbol.Observable} -> The validation stream.
 */
const authUser = payload => (
  securityServices.fetchUserRequest(payload)
    .concatMap(user => (
      initState({ ...user, ...payload })
        .map(data => ({
          user,
          ...data
        }))
    ))
);

export default authUser;
