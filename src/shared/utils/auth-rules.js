/**
 * Module with the a set of authentication rules.
 * @module src/shared/utils/auth-rules
 */

// React - Redux.
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

// App Config.
import * as routes from '../constants/routes';

// Constants.
import { ADMIN, TRANSPORTER } from '../constants/user-types';

// Rule when a user is authenticated it will
// be redirected to the Dashboard route.
const userIsAuthenticated = new UserAuthWrapper({
  authSelector: state => (state.user),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: user => (user.isAuth),
  failureRedirectPath: () => (routes.DASHBOARD)
});

// Rule when a user is not authenticated it will
// be redirected to the Login route.
export const userIsNotAuthenticated = new UserAuthWrapper({
  authSelector: state => (state.user),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: user => (!user.isAuth),
  failureRedirectPath: () => (routes.LOGIN),
  allowRedirectBack: false
});

// Rule when a user is authenticated and also
// is of type ADMIN.
export const userIsAdmin = new UserAuthWrapper({
  authSelector: state => (state.user),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => (user.isAuth && user.data.IdTipo === ADMIN),
  failureRedirectPath: () => (routes.DASHBOARD),
  allowRedirectBack: false
});

// Rule when a user is authenticated and also
// is of type TRANSPORTER.
export const userIsTransporter = new UserAuthWrapper({
  authSelector: state => (state.user),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsTransporter',
  predicate: user => (user.isAuth && user.data.IdTipo === TRANSPORTER),
  failureRedirectPath: () => (routes.DASHBOARD),
  allowRedirectBack: false
});

export default {
  userIsAuthenticated,
  userIsNotAuthenticated,
  userIsAdmin,
  userIsTransporter
};
