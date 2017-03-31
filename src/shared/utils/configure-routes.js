/**
 * Module with the config of the router.
 * @module src/shared/containers/router
 */
// React.
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Utils.
import { authRules } from '../utils/';

// App Config.
import * as routes from '../constants/routes';

// Components.
import {
  App,
  NewUser,
  LoginContainer,
  Dashboard,
  UsersList,
  AssignTransporter,
  AssignDistributors,
  PackageReception,
  AssignOrders
} from '../../client/containers/';
import { NotFound } from '../components/';

/**
 * Chains auth wrappers to the react-router onEnter event.
 * @param {Array} listOfOnEnters -> The list of wrappers.
 * @returns {Function} -> The final connector callback.
 */
const onEnterChain = (...listOfOnEnters) => (store, nextState, replace) => {
  let redirected = false;
  const wrappedReplace = (...args) => {
    replace(...args);
    redirected = true;
  };
  listOfOnEnters.forEach((onEnter) => {
    if (!redirected) {
      onEnter(store, nextState, wrappedReplace);
    }
  });
};

/**
 * Configure the routes with the auth settings.
 * @param {Object} store -> The redux store.
 * @returns {Any} -> The list of routes.
 */
const configureRoutes = (store) => {
  /**
   * Connects the react-router onEnter event to the auth wrapper.
   * @param {Function} fn -> The onEnter callback.
   * @returns {Function} -> The connector function.
   */
  const connect = fn =>
    (nextState, replaceState) => fn(store, nextState, replaceState);

  const {
    userIsAuthenticated,
    userIsNotAuthenticated,
    userIsAdmin,
    userIsTransporter
  } = authRules;

  return (
    <Route path={routes.DASHBOARD} component={App}>
      <IndexRoute
        component={userIsAuthenticated(Dashboard)}
        onEnter={connect(userIsAuthenticated.onEnter)}
      />
      <Route
        path={routes.LOGIN}
        component={userIsNotAuthenticated(LoginContainer)}
        onEnter={connect(userIsNotAuthenticated.onEnter)}
      />
      <Route
        path={routes.USERS_LIST}
        component={userIsAuthenticated(userIsAdmin(UsersList))}
        onEnter={connect(onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter))}
      />
      <Route
        path={routes.NEW_USER}
        component={userIsAuthenticated(userIsAdmin(NewUser))}
        onEnter={connect(onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter))}
      />
      <Route
        path={routes.ASSIGN_TRANSPORTER}
        component={userIsAuthenticated(userIsAdmin(AssignTransporter))}
        onEnter={connect(onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter))}
      />
      <Route
        path={routes.ASSIGN_DISTRIBUTORS}
        component={userIsAuthenticated(userIsAdmin(AssignDistributors))}
        onEnter={connect(onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter))}
      />
      <Route
        path={routes.PACKAGE_RECEPTION}
        component={userIsAuthenticated(userIsTransporter(PackageReception))}
        onEnter={connect(onEnterChain(userIsAuthenticated.onEnter, userIsTransporter.onEnter))}
      />
      <Route
        path={routes.ROUTES_ASSIGN}
        component={userIsAuthenticated(userIsTransporter(AssignOrders))}
        onEnter={connect(onEnterChain(userIsAuthenticated.onEnter, userIsTransporter.onEnter))}
      />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};

export default configureRoutes;
