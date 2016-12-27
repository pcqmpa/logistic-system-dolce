/**
 * Module with the client index.
 * @module src/client/
 */

// React.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Utils.
import { configureStore } from '../shared/utils/';

// App Config.
import { MOUNT_ID, env } from '../../config/';

// App.
import AppRouter from './app-router';
import reducer from '../shared/reducers/';

// Components.
import { DevTools } from '../shared/containers/';

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
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <AppRouter history={history} store={store} />
        { env.DEBUG && <DevTools /> }
      </div>
    </Provider>,
    mountNode
  );
};

// Setup module hot reload.
if (env.DEBUG && module.hot) {
  module.hot.accept(render);
}

// Setup window onload event.
window.onload = render;
