/**
 * Module with the client index.
 * @module src/client/
 */

// React.
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

// Utils.
import { configureStore } from '../shared/utils/';

// App Config.
import { MOUNT_ID, env } from '../../config/';

// App.
import App from './app';
import reducer from '../shared/reducers/';

//
// Initialise App
// -----------------------------------------------------------------------------

// DOM root element.
const mountNode = document.getElementById(MOUNT_ID);
// Configure store.
const store = configureStore(
  browserHistory,
  reducer,
  window.__PRELOADED_STATE__
);
// Redux browser history.
const history = syncHistoryWithStore(browserHistory, store);

//
// Render App
// -----------------------------------------------------------------------------

/**
 * It will render the reactDOM app.
 * @returns {void}
 */
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component
        store={store}
        history={history}
      />
    </AppContainer>,
    mountNode
  );
};

// Setup module hot reload.
if (env.DEBUG && module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}

// Setup window onload event.
window.onload = () => {
  render(App);
};

