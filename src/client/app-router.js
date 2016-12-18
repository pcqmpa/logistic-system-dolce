/**
 * Module with the client app router.
 * @module src/client/app-router
 */

// React.
import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { configureRoutes } from '../shared/utils/';

/**
 * Client app router component.
 * @param {Object} props -> The component properties.
 * @returns {ReactElement} -> The react router.
 */
const AppRouter = ({ history, store }) => (
  <Router
    history={history}
    routes={configureRoutes(store)}
  />
);

/**
 * PropTypes.
 * @property {Object} history -> The browser history.
 * @property {Object} store -> The redux store.
 */
AppRouter.propTypes = {
  history: PropTypes.shape().isRequired,
  store: PropTypes.shape().isRequired
};

export default AppRouter;
