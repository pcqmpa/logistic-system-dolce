/**
 * Module with the server Routes component.
 * @module src/server/components/routes
 */
// React - Router.
import React from 'react';
import { Route, Switch } from 'react-router';

// App Config.
import * as routes from '../../shared/constants/routes';

// Components.
import {
  Main,
  NewUser,
  LoginContainer,
  Dashboard,
  UsersList,
  AssignTransporter,
  AssignDistributors,
  PackageReception,
  AssignOrders
} from '../../client/containers/';
import { NotFound } from '../../shared/components/';

// Utils.
import { configAuth } from '../utils/';

// Constants.
import {
  ADMIN,
  TRANSPORTER
} from '../../shared/constants/user-types';

/**
 * The ServerRoutes component.
 * It Wraps the app routes to be manage from the server.
 */
const ServerRoutes = () => (
  <Main>
    <Switch>
      <Route
        exact
        path={routes.DASHBOARD}
        component={configAuth(Dashboard, { home: true })}
      />
      <Route
        path={routes.LOGIN}
        component={configAuth(LoginContainer, { noAuth: true })}
      />
      <Route
        path={routes.USERS_LIST}
        component={configAuth(UsersList, { userType: ADMIN })}
      />
      <Route
        path={routes.NEW_USER}
        component={configAuth(NewUser, { userType: ADMIN })}
      />
      <Route
        path={routes.ASSIGN_TRANSPORTER}
        component={configAuth(AssignTransporter, { userType: ADMIN })}
      />
      <Route
        path={routes.ASSIGN_DISTRIBUTORS}
        component={configAuth(AssignDistributors, { userType: ADMIN })}
      />
      <Route
        path={routes.PACKAGE_RECEPTION}
        component={configAuth(PackageReception, { userType: TRANSPORTER })}
      />
      <Route
        path={routes.ROUTES_ASSIGN}
        component={configAuth(AssignOrders, { userType: TRANSPORTER })}
      />
      <Route component={NotFound} />
    </Switch>
  </Main>
);

export default ServerRoutes;
