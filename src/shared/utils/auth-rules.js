/**
 * Module with the a set of authentication rules.
 * @module src/shared/utils/auth-rules
 */

import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

// App Config.
import * as routes from '../constants/routes';

// Rule when a user is authenticated it will
// be redirected to the Dashboard route.
const userIsAuthenticated = new UserAuthWrapper({
  authSelector: state => (state.user),
  redirectAction: routerActions.push,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: user => (user.isAuth)
});

// Rule when a user is not authenticated it will
// be redirected to the Login route.
const userIsNotAuthenticated = new UserAuthWrapper({
  authSelector: state => (state.user),
  redirectAction: routerActions.push,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: user => (!user.isAuth),
  failureRedirectPath: () => (routes.DASHBOARD)
});

export default { userIsAuthenticated, userIsNotAuthenticated };
