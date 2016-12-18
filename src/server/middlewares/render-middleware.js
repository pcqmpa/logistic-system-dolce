/**
 * Module with the render middleware.
 * @module src/server/middlewares/render-middleware
 */

import serialize from 'serialize-javascript';

// React
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';

// App Config.
import { env } from '../../../config/config';
import * as responses from '../constants/responses';

// Utils.
import {
  Log,
  configureStore,
  configureRoutes
} from '../../shared/utils/';
import { validateAuth } from '../utils/';

// Actions.
import { loginSuccess } from '../../shared/actions/user-actions';

// App.
import reducer from '../../shared/reducers/';

// Components.
import { NotFound } from '../../client/components/';
import { Html } from '../components/';

/**
 * Render the content.
 * @private
 * @param {String} content -> The content to be rendered.
 * @returns {String} -> The html.
 */
const render = html => (`<!DOCTYPE html>${html}`);

 /**
  * Configure the settings to render the html.
  * @private
  * @param {Object} nextProps -> The next props to be rendered.
  * @param {Object} store -> The redux store.
  * @param {Any} markup -> (optional)The content to be rendered.
  * @returns {String} -> The rendered html.
  */
const renderHtml = (nextProps, store, markup) => {
  if (markup) {
    return renderToString(markup);
  }

  const preloadedState = serialize(store.getState());
  const content = renderToString(
    <Html
      assets={webpackIsomorphicTools.assets()}
      preloadedState={preloadedState}
    >
      <Provider store={store} key="provider">
        <RouterContext {...nextProps} />
      </Provider>
    </Html>
  );

  return render(content, preloadedState);
};

/**
 * Render middleware handler.
 * @private
 * @param {Object} req -> The request object.
 * @param {Object} res -> The response object.
 * @returns {void}
 */
const handleRender = (req, res) => {
  const memoryHistory = createHistory(req.originalUrl);
  const store = configureStore(
    memoryHistory,
    reducer
  );
  const history = syncHistoryWithStore(memoryHistory, store);

  // Validate session.
  const user = validateAuth(req.session);
  if (user) {
    store.dispatch(loginSuccess(user));
  }

  // Configure routes.
  const routes = configureRoutes(store);

  // Refresh Isomorphic Assets.
  if (env.DEBUG) {
    webpackIsomorphicTools.refresh();
  }

  match({ history, routes, location: req.originalUrl },
   (err, redirectLocation, renderProps) => {
     if (err) {
       // Display error if exists.
       Log.error(err);
       return res.status(responses.ERROR)
         .send(err.message);
     } else if (redirectLocation) {
       // In case of redirect propagate the redirect to the browser.
       return res.redirect(
         responses.REDIRECT,
         redirectLocation.pathname + redirectLocation.search
       );
     } else if (!renderProps) {
       // Route not found.
       return res.status(responses.NOT_FOUND)
         .send(renderHtml(null, null, <NotFound />));
     }

     return res.status(responses.OK)
       .send(renderHtml(renderProps, store));
   });
};

/**
 * Configure render middleware.
 * @param {Object} app -> The server instance.
 * @returns {void}
 */
const renderMiddleware = (app) => {
  app.use(handleRender);
};

export default renderMiddleware;
