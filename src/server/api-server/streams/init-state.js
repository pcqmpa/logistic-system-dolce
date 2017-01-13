// TODO: Think a better name and test this solution.
/**
 * Module with a stream to init the admin user state.
 * @module src/server/api-server/streams/init-state
 */
// Services.
import {
  userServices,
  logisticTypesServices,
  transporterServices
} from '../services/';

/**
 * Stream that request the admin init state.
 * @returns {symbol.Observable} -> The init state stream.
 */
const initState = () => (
  userServices.consultUsersRequest()
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
    ))
);

export default initState;
