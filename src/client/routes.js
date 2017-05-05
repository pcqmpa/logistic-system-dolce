/**
 * Module with the Routes component.
 * @module src/client/routes
 */
// React - Router.
import React from 'react';
import { Route, Switch } from 'react-router';

// App Config.
import * as routes from '../shared/constants/routes';

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
} from './containers/';
import { NotFound } from '../shared/components/';

/**
 * The app Routes component.
 * It Wraps the app routes to be manage from the client and the server.
 */
const Routes = () => (
  <Main>
    <Switch>
      <Route
        exact
        path={routes.DASHBOARD}
        component={Dashboard}
      />
      <Route
        path={routes.LOGIN}
        component={LoginContainer}
      />
      <Route
        path={routes.USERS_LIST}
        component={UsersList}
      />
      <Route
        path={routes.NEW_USER}
        component={NewUser}
      />
      <Route
        path={routes.ASSIGN_TRANSPORTER}
        component={AssignTransporter}
      />
      <Route
        path={routes.ASSIGN_DISTRIBUTORS}
        component={AssignDistributors}
      />
      <Route
        path={routes.PACKAGE_RECEPTION}
        component={PackageReception}
      />
      <Route
        path={routes.ROUTES_ASSIGN}
        component={AssignOrders}
      />
      <Route component={NotFound} />
    </Switch>
  </Main>
);

export default Routes;
