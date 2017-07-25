// TODO: Think a better name and test this solution.
/**
 * Module with a stream to init the admin user state.
 * @module src/server/api-server/streams/init-state
 */
// Rxjs.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

// Services.
import {
  deliverOrdersServices,
  logisticTypesServices,
  packageReceptionServices,
  transporterServices,
  userServices
} from '../services/';

// Constants.
import { DISTRIBUTOR, TRANSPORTER } from '../../../shared/constants/user-types';

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
      .concatMap((usersString) => {
        const users = JSON.parse(usersString);
        return logisticTypesServices.consultLogisticTypesRequest()
          .concatMap((typesString) => {
            const types = JSON.parse(typesString);
            return packageReceptionServices.getOrdersListRequest(user.username)
              .map((ordersString) => {
                const orders = JSON.parse(ordersString);
                return {
                  orders,
                  types,
                  users
                };
              });
          });
      })
      .do(null, (err) => {
        console.log(new Error(err)); // eslint-disable-line
      });
  }

  if (user.IdTipo === DISTRIBUTOR) {
    return deliverOrdersServices.getOrdersToDeliverRequest(user.username)
      .map((ordersString) => {
        const orders = JSON.parse(ordersString);
        if (typeof orders === 'string') {
          return { orders: [] };
        }
        return { orders };
      })
      .do(null, (err) => {
        console.log(err); // eslint-disable-line
      });
  }

  return userServices.consultUsersRequest()
    .concatMap((usersString) => {
      const users = JSON.parse(usersString);
      return logisticTypesServices.consultLogisticTypesRequest()
        .concatMap((typesString) => {
          const types = JSON.parse(typesString);
          return transporterServices.getTransportersRequest()
            .map((transportersString) => {
              const transporters = JSON.parse(transportersString);
              return {
                transporters,
                types,
                users
              };
            });
        });
    })
    .do(null, (err) => {
      console.log(new Error(err)); // eslint-disable-line
    });
};

export default initState;
