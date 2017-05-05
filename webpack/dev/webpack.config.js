const webpack = require('webpack');
const { Config } = require('webpack-config');

const autoprefixer = require('autoprefixer');

// Isomorphic Config.
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('../webpack-isomorphic-tools-config');

const { env, appName } = require('../../config/');
const {
  CONTEXT_SRC,
  ASSETS_DIR
} = require('../../config/paths');

module.exports = Config()
  .extend('./webpack/webpack.config.common.js')
  .merge({
    // The configuration for the server-side rendering
    context: CONTEXT_SRC,
    entry: {
      [appName]: [
        // Activate HMR for React
        'react-hot-loader/patch',
        // Bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        // `webpack-dev-server/client?http://${env.HOST}:${env.DEV_SERVER_PORT}`,
        // Bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',
        // The entry point of the app
        './src/client/index.js'
      ]
    },
    output: {
      filename: '[name]-[hash].js',
      path: ASSETS_DIR,
      chunkFilename: '[name]-[hash].js',
      publicPath: `http://${env.HOST}:${env.DEV_SERVER_PORT}/assets/`
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components|server)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['latest', { modules: false }], 'react', 'stage-3'],
              plugins: ['react-hot-loader/babel', 'transform-class-properties']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ],
          exclude: /node_modules/
        }
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
      // Enable HMR globally.
      new webpack.HotModuleReplacementPlugin(),
      // Prints more readable module names in the browser console on HMR updates.
      new webpack.NamedModulesPlugin(),
      new WebpackIsomorphicToolsPlugin(
        webpackIsomorphicToolsConfig
      ).development()
    ]
  });
