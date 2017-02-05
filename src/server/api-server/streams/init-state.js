// TODO: Think a better name and test this solution.
/**
 * Module with a stream to init the admin user state.
 * @module src/server/api-server/streams/init-state
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

// Services.
import {
  userServices,
  logisticTypesServices,
  transporterServices,
  packageReceptionServices
} from '../services/';

// Constants.
import { TRANSPORTER } from '../../../shared/constants/user-types';

/**
 * Stream that request the admin init state.
 * @param {Object} user -> The current user.
 * @returns {symbol.Observable} -> The init state stream.
 */
const initState = (user) => {
  if (!user) {
    return Observable.of({});
  }

  if (user.IdTipo === TRANSPORTER) {
    return userServices.consultUsersRequest()
    .concatMap(users => (
      logisticTypesServices.consultLogisticTypesRequest()
        .concatMap(types => (
          packageReceptionServices.getOrdersListRequest(user.username)
            .map(orders => ({
              users,
              orders,
              types
            }))
        ))
    ));
  }

  return userServices.consultUsersRequest()
    .concatMap(users => (
      logisticTypesServices.consultLogisticTypesRequest()
        .concatMap(types => (
          transporterServices.getTransportersRequest()
            .map(transporters => ({
              users,
              types,
              transporters
            }))
        ))
    ));
};

export default initState;
