const path = require('path');
const webpack = require('webpack');
const { Config } = require('webpack-config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Isomorphic Config.
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsConfig = require('../webpack-isomorphic-tools-config');

const { appName } = require('../../config/');
const {
  CONTEXT_SRC,
  ASSETS_DIR
} = require('../../config/paths');

const extractSass = new ExtractTextPlugin({
  filename: '[name]-[chunkhash].css',
  allChunks: true
});

module.exports = Config()
  .extend('./webpack/webpack.config.common.js')
  .merge({
    // The configuration for the server-side rendering
    context: CONTEXT_SRC,
    entry: {
      [appName]: './src/client/index.js'
    },
    output: {
      filename: '[name]-[hash].js',
      path: ASSETS_DIR,
      chunkFilename: '[name]-[hash].js',
      publicPath: '/assets/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components|server)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['latest', { modules: false }], 'react', 'stage-3'],
              plugins: ['transform-class-properties']
            }
          }
        },
        {
          test: /\.scss$/,
          // loader: `style!${cssLoader}!postcss!${sassLoader}`,
          use: extractSass.extract({
            use: [
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          }),
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      extractSass,
      new CleanWebpackPlugin([path.relative(CONTEXT_SRC, ASSETS_DIR)], {
        root: CONTEXT_SRC
      }),
      new webpack.DefinePlugin({
        'process.env': {
          // Useful to reduce the size of client-side libraries, e.g. react
          NODE_ENV: JSON.stringify('production')
        },
        __PRODUCTION__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false  // enable/disable redux-devtools
      }),
      // Compresses javascript files
      new webpack.optimize.UglifyJsPlugin(),
      new WebpackIsomorphicToolsPlugin(
        webpackIsomorphicToolsConfig
      )
    ]
  });
