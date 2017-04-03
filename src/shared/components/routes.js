/**
 * Module with the Routes component.
 * @module src/shared/components/routes
 */
// React - Router.
import React, { Component, PropTypes } from 'react';
import { Route, Switch } from 'react-router';

// Utils.
import { authRules } from '../utils/';

// App Config.
import * as routes from '../constants/routes';

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
import { NotFound } from './';

/**
 * The app Routes component.
 * It Wraps the app routes to be manage from the client and the server.
 */
class Routes extends Component {
  /**
   * The component proptypes.
   * @type {Object}
   * @property {Object} store -> The actual app redux store.
   */
  static propTypes = {
    store: PropTypes.shape().isRequired
  };

  /**
   * Chains auth wrappers to the react-router onEnter event.
   * @param {Array} listOfOnEnters -> The list of wrappers.
   * @returns {Function} -> The final connector callback.
   */
  onEnterChain = (...listOfOnEnters) => (store, nextState, replace) => {
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
   * Connects the react-router onEnter event to the auth wrapper.
   * @param {Function} fn -> The onEnter callback.
   * @returns {Function} -> The connector function.
   */
  connect = (fn) => {
    const { store } = this.props;

    return (nextState, replaceState) => (
      fn(store, nextState, replaceState)
    );
  };

  /**
   * Renders the Routes component.
   * @returns {ReactElement} -> The react component.
   */
  render() {
    const {
      userIsAuthenticated,
      userIsNotAuthenticated,
      userIsAdmin,
      userIsTransporter
    } = authRules;

    return (
      <Main>
        <Switch>
          <Route
            exact
            path={routes.DASHBOARD}
            component={userIsAuthenticated(Dashboard)}
            onEnter={this.connect(userIsAuthenticated.onEnter)}
          />
          <Route
            path={routes.LOGIN}
            component={userIsNotAuthenticated(LoginContainer)}
            onEnter={this.connect(userIsNotAuthenticated.onEnter)}
          />
          <Route
            path={routes.USERS_LIST}
            component={userIsAuthenticated(userIsAdmin(UsersList))}
            onEnter={this.connect(
              this.onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter)
            )}
          />
          <Route
            path={routes.NEW_USER}
            component={userIsAuthenticated(userIsAdmin(NewUser))}
            onEnter={this.connect(
              this.onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter)
            )}
          />
          <Route
            path={routes.ASSIGN_TRANSPORTER}
            component={userIsAuthenticated(userIsAdmin(AssignTransporter))}
            onEnter={this.connect(
              this.onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter)
            )}
          />
          <Route
            path={routes.ASSIGN_DISTRIBUTORS}
            component={userIsAuthenticated(userIsAdmin(AssignDistributors))}
            onEnter={this.connect(
              this.onEnterChain(userIsAuthenticated.onEnter, userIsAdmin.onEnter)
            )}
          />
          <Route
            path={routes.PACKAGE_RECEPTION}
            component={userIsAuthenticated(userIsTransporter(PackageReception))}
            onEnter={this.connect(
              this.onEnterChain(userIsAuthenticated.onEnter, userIsTransporter.onEnter)
            )}
          />
          <Route
            path={routes.ROUTES_ASSIGN}
            component={userIsAuthenticated(userIsTransporter(AssignOrders))}
            onEnter={this.connect(
              this.onEnterChain(userIsAuthenticated.onEnter, userIsTransporter.onEnter)
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Main>
    );
  }
}

export default Routes;
