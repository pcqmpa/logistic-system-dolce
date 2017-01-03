// TODO: Think a better name and test this solution.
/**
 * Module with a stream to authenticate user and init state.
 * @module src/server/api-server/streams/auth-user
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';

// Services.
import { securityServices } from '../services';
import { initState } from './';

// Constants.
import { ADMIN } from '../../../shared/constants/user-types';

/**
 * Stream that validates user.
 * @returns {symbol.Observable} -> The validation stream.
 */
const authUser = payload => (
  securityServices.fetchUserRequest(payload)
    .concatMap((user) => {
      if (user.IdTipo === ADMIN) {
        return initState()
          .map(data => ({
            user,
            ...data
          }));
      }
      return Observable.of(user);
    })
);

export default authUser;
