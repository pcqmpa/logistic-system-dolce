/**
 * Module with the redux store configuration.
 * @module src/shared/utils/configure-store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistState } from 'redux-devtools';

// Containers.
import { DevTools } from '../containers/';

// Epics.
import rootEpic from '../epics/';

// App Config.
import { env } from '../../../config/';

/**
 * Create a composed store.
 * @param {Object} history -> Browser history.
 * @param {Object} reducers -> App reducer.
 * @param {Object} initialState -> The initial state of the app.
 * @returns {Object} -> Redux store.
 */
const configureStore = (
  history,
  reducers,
  initialState = {}
) => {
  // Middlewares.
  const reduxRouterMiddleware = routerMiddleware(history);
  const epicMiddleware = createEpicMiddleware(rootEpic);
  let enhancer = applyMiddleware(reduxRouterMiddleware, epicMiddleware);

  if (env.DEBUG && _CLIENT_) {
    enhancer = compose(
      applyMiddleware(reduxRouterMiddleware, epicMiddleware),
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&#]+)\b/
        )
      )
    );
  }

  const store = createStore(reducers, initialState, enhancer);

  if (env.DEBUG && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducers);
    });
  }

  return store;
};

export default configureStore;
