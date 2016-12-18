const path = require('path');
const webpack = require('webpack');
const { Config } = require('webpack-config');

// Isomorphic Config.
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('../webpack-isomorphic-tools-config');

const { env, appName } = require('../../config/config');
const {
  CONTEXT_SRC,
  STATICS_DIR
} = require('../../config/paths');

module.exports = Config()
  .extend('./webpack/webpack.config.common.js')
  .merge({
    // The configuration for the server-side rendering
    context: CONTEXT_SRC,
    entry: {
      [appName]: [
        `webpack-hot-middleware/client?path=http://${env.HOST}:${env.DEV_SERVER_PORT}/__webpack_hmr`,
        './src/client/index.js'
      ]
    },
    output: {
      filename: '[name]-[hash].js',
      path: STATICS_DIR,
      chunkFilename: '[name]-[hash].js',
      publicPath: `http://${env.HOST}:${env.DEV_SERVER_PORT}/assets/`
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components|server)/,
          loader: 'babel',
          query: {
            presets: ['es2016-node5', 'react', 'stage-0'],
            plugins: ['transform-class-properties',
              [
                'react-transform', {
                  transforms: [
                    {
                      transform: 'react-transform-catch-errors',
                      imports: ['react', 'redbox-react']
                    },
                    {
                      transform: 'react-transform-hmr',
                      imports: ['react'],
                      locals: ['module']
                    }
                  ]
                }
              ]
            ]
          }
        },
        {
          test: /\.scss$/,
          // loader: 'style!css?sourceMap!postcss!sass?sourceMap',
          loaders: [
            'style',
            'css?importLoaders=2&sourceMap',
            'postcss',
            'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
          ],
          exclude: /node_modules/
        }
      ]
    },
    progress: true,
    resolve: {
      root: [
        path.resolve('src'),
        path.resolve('node_modules')
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          BABEL_ENV: JSON.stringify('development')
        },
        _CLIENT_: true,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true  // enable/disable redux-devtools
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new WebpackIsomorphicToolsPlugin(
        webpackIsomorphicToolsConfig
      ).development()
    ]
  });
