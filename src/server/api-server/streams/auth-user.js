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
import 'rxjs/add/operator/do';

// Services.
import { securityServices } from '../services';
import { initState } from './';

/**
 * Stream that validates user.
 * @returns {Symbol.Observable} -> The validation stream.
 */
const authUser = payload => (
  securityServices.fetchUserRequest(payload)
    .concatMap((userString) => {
      const user = JSON.parse(userString);

      if (!user || !user.LogValido) {
        return Observable.of(null);
      }

      return initState({ ...user, ...payload })
        .map(data => ({
          user,
          ...data
        }));
    })
    .do(null, (err) => {
      console.log(new Error(err)); // eslint-disable-line
    })
);

export default authUser;
