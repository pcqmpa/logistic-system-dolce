/**
 * Module with the client app router.
 * @module src/client/app-router
 */

// React - Router - Redux.
import React, { PropTypes } from 'react';
import { ConnectedRouter } from 'react-router-redux';

// Components.
import Routes from './routes';

/**
 * Client app router component.
 * @param {Object} props -> The component properties.
 * @returns {ReactElement} -> The react router.
 */
const AppRouter = ({ history }) => (
  <ConnectedRouter history={history}>
    <Routes />
  </ConnectedRouter>
);

/**
 * PropTypes.
 * @property {Object} history -> The browser history.
 * @property {Object} store -> The redux store.
 */
AppRouter.propTypes = {
  history: PropTypes.shape().isRequired
};

export default AppRouter;
