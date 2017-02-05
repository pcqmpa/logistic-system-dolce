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
import { env } from '../../../config/';
import * as responses from '../constants/responses';

// Lib.
import serializer from '../../shared/lib/serializer';

// Utils.
import {
  Log,
  configureStore,
  configureRoutes
} from '../../shared/utils/';
import { validateAuth } from '../utils/';

// Actions.
import {
  updateSerializedDataTable
} from '../../shared/actions/data-table-actions';
import { loginSuccess } from '../../shared/actions/user-actions';
import {
  updateUsersList,
  updateUserTypes
} from '../../shared/actions/users-actions';
import {
  initTransporterList,
  updateDistributorFormList
} from '../../shared/actions/transporters-actions';
import { updateOrdersList } from '../../shared/actions/package-reception-actions';

// Services.
import { initState } from '../api-server/streams/';
// import { logisticTypesServices } from '../api-server/services/';

// App.
import reducer from '../../shared/reducers/';

// Components.
import { NotFound } from '../../shared/components/';
import { Html } from '../components/';

// Constants.
import {
  ADMIN,
  DISTRIBUTOR,
  TRANSPORTER
} from '../../shared/constants/user-types';
import {
  DISTRIBUTOR_FORM,
  TRANSPORTER_FORM,
  PACKAGE_RECEPTION_FORM
} from '../../shared/constants/strings';

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
  // Validate session.
  const { user } = validateAuth(req.session);

  initState(user)
    .subscribe((initialData) => {
      const memoryHistory = createHistory(req.originalUrl);
      const store = configureStore(
        memoryHistory,
        reducer
      );
      const history = syncHistoryWithStore(memoryHistory, store);

      if (user) {
        store.dispatch(loginSuccess(user));
        store.dispatch(updateUsersList(initialData.users));
        store.dispatch(updateUserTypes(initialData.types));

        if (user.IdTipo === ADMIN) {
          store.dispatch(initTransporterList(initialData.transporters));
          store.dispatch(updateSerializedDataTable(
            TRANSPORTER_FORM,
            initialData.transporters
          ));
          store.dispatch(updateDistributorFormList(initialData.users));
          store.dispatch(updateSerializedDataTable(
            DISTRIBUTOR_FORM,
            initialData.users.filter(rawUser => (rawUser.IdTipo === DISTRIBUTOR))
          ));
        }

        if (user.IdTipo === TRANSPORTER) {
          const checkedOrders = serializer.toCheckedList(initialData.orders);
          store.dispatch(updateOrdersList(checkedOrders));
          store.dispatch(updateSerializedDataTable(
            PACKAGE_RECEPTION_FORM,
            checkedOrders
          ));
        }
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
