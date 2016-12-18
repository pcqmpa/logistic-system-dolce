/**
 * Module than nitializes a server-side instance of webpack-isomorphic-tools.
 * @module src/server/
 */

import 'source-map-support/register';

import WebpackIsomorphicTools from 'webpack-isomorphic-tools';

// Webpack Isomorphic Config;
import config from '../../webpack/webpack-isomorphic-tools-config';

// App config.
import { CONTEXT_SRC } from '../../config/paths';

global.webpackIsomorphicTools = new WebpackIsomorphicTools(config)
  .server(CONTEXT_SRC, () => (require('./server'))); // eslint-disable-line global-require
