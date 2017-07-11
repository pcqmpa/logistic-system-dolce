/**
 * Module with the render middleware.
 * @module src/server/middlewares/render-middleware
 */
// Node.
import serialize from 'serialize-javascript';

// React - Router - Redux.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

// App Config.
import { env } from '../../../config/';
import * as responses from '../constants/responses';

// Lib.
import serializer from '../../shared/lib/serializer';

// Utils.
import { configureStore } from '../../shared/utils/';
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

// App.
import reducer from '../../shared/reducers/';

// Components.
import { Html, ServerRoutes } from '../components/';

// Constants.
import {
  ADMIN,
  DISTRIBUTOR,
  TRANSPORTER
} from '../../shared/constants/user-types';
import {
  DISTRIBUTOR_FORM,
  TRANSPORTER_FORM
} from '../../shared/constants/strings';

/**
 * Render the content.
 * @private
 * @param {String} html -> The content to be rendered.
 * @returns {String} -> The html.
 */
const render = html => (`<!DOCTYPE html>${html}`);

/**
  * Configure the settings to render the html.
  * @private
  * @param {Object} store -> The redux store.
  * @param {String} url -> The url to be passed to the router.
  * @returns {Object} -> The app content.
  */
const renderHtml = (store, url) => {
  // This context object contains the results of the render.
  const context = {};
  const preLoadedState = serialize(store.getState());
  const html = renderToString(
    <Html
      assets={webpackIsomorphicTools.assets()}
      preLoadedState={preLoadedState}
    >
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <ServerRoutes />
        </StaticRouter>
      </Provider>
    </Html>
  );

  return { context, html };
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
      const store = configureStore(reducer);

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
        }
      }

      // Refresh Isomorphic Assets.
      if (env.DEBUG) {
        webpackIsomorphicTools.refresh();
      }

      // Rendering process.
      const content = renderHtml(store, req.url);

      // context.url will contain the URL to redirect to if a <Redirect> was used.
      if (content.context.url) {
        return res
          .redirect(
            responses.REDIRECT,
            content.context.url
          );
      }

      return res
        .status(responses.OK)
        .send(render(content.html));
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
