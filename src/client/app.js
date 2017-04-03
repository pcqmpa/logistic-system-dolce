/**
 * Module with the App main component.
 * @module src/client/app
 */
// React - Redux.
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

// App.
import AppRouter from './app-router';

// App Config.
import { env } from '../../config/';

// Components.
import { DevTools } from '../shared/containers/';

/**
 * The App component.
 * Encapsulates all the react components tree.
 * @returns {ReactElement} -> The react application.
 */
const App = ({
  store,
  history
}) => (
  <Provider store={store}>
    <div>
      <AppRouter history={history} store={store} />
      { env.DEBUG && <DevTools /> }
    </div>
  </Provider>
);

/**
 * The component proptypes.
 * @type {Object}
 * @property {Object} store -> The actual redux store.
 * @property {Object} history -> The browser history.
 */
App.propTypes = {
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default App;
