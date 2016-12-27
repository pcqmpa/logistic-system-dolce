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

const extractCSS = new ExtractTextPlugin(
  'main-[chunkhash].css',
  { allChunks: true }
);

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
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components|server)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2016-node5', 'react', 'stage-0', 'airbnb'],
            plugins: ['transform-class-properties']
          }
        },
        {
          test: /\.scss$/,
          // loader: `style!${cssLoader}!postcss!${sassLoader}`,
          loader: extractCSS.extract('style', 'css!postcss!sass'),
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      root: [
        path.resolve('src'),
        path.resolve('node_modules')
      ]
    },
    plugins: [
      extractCSS,
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
      // Omit duplicate modules
      new webpack.optimize.DedupePlugin(),
      // Assign the module and chunk ids by occurrence count.
      // Ids that are used often get lower (shorter) ids.
      // This make ids predictable, reduces to total file size and is recommended.
      new webpack.optimize.OccurenceOrderPlugin(),
      // Compresses javascript files
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new WebpackIsomorphicToolsPlugin(
        webpackIsomorphicToolsConfig
      )
    ]
  });
