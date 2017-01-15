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
  RoutesAssign
} from '../../client/containers/';
import { NotFound } from '../components/';

/**
 * Configure the routes with the auth settings.
 * @param {Object} store -> The redux store.
 * @returns {Any} -> The list of routes.
 */
const configureRoutes = (store) => {
  const connect = fn =>
    (nextState, replaceState) => fn(store, nextState, replaceState);

  return (
    <Route path={routes.DASHBOARD} component={App}>
      <IndexRoute
        component={authRules.userIsAuthenticated(Dashboard)}
        onEnter={connect(authRules.userIsAuthenticated.onEnter)}
      />
      <Route
        path={routes.LOGIN}
        component={authRules.userIsNotAuthenticated(LoginContainer)}
        onEnter={connect(authRules.userIsNotAuthenticated.onEnter)}
      />
      <Route
        path={routes.USERS_LIST}
        component={authRules.userIsAuthenticated(UsersList)}
        onEnter={connect(authRules.userIsAuthenticated.onEnter)}
      />
      <Route
        path={routes.NEW_USER}
        component={authRules.userIsAuthenticated(NewUser)}
        onEnter={connect(authRules.userIsAuthenticated.onEnter)}
      />
      <Route
        path={routes.ASSIGN_TRANSPORTER}
        component={authRules.userIsAuthenticated(AssignTransporter)}
        onEnter={connect(authRules.userIsAuthenticated.onEnter)}
      />
      <Route
        path={routes.ASSIGN_DISTRIBUTORS}
        component={authRules.userIsAuthenticated(AssignDistributors)}
        onEnter={connect(authRules.userIsAuthenticated.onEnter)}
      />
      <Route
        path={routes.PACKAGE_RECEPTION}
        component={authRules.userIsAuthenticated(PackageReception)}
        onEnter={connect(authRules.userIsAuthenticated.onEnter)}
      />
      <Route
        path={routes.ROUTES_ASSIGN}
        component={authRules.userIsAuthenticated(RoutesAssign)}
        onEnter={connect(authRules.userIsAuthenticated.onEnter)}
      />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};

export default configureRoutes;
