/* eslint-disable import/no-extraneous-dependencies */
/**
 * Module with the dev server config.
 * @module src/server/dev-server
 */

import Express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// App Config.
import { env } from '../../config/';
import webpackConfig from '../../webpack/dev/webpack.config';

// Utils.
import { Log } from './utils/';

// Constants.
import { DEV_SIGNAL } from '../shared/constants/messages';

//
// Server Configuration
// -----------------------------------------------------------------------------
const app = new Express();
const compiler = webpack(webpackConfig);
const serverOptions = {
  contentBase: `http://${env.HOST}:${env.DEV_SERVER_PORT}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Controls-Allow-Origin': '*' },
  stats: { colors: true }
};

app.use(webpackMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

//
// Initialise Server
// -----------------------------------------------------------------------------

app.listen(env.DEV_SERVER_PORT, (err) => {
  if (err) {
    Log.error(err);
  } else {
    Log.info(`${DEV_SIGNAL} ${env.DEV_SERVER_PORT}`);
  }
});
