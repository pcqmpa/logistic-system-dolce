const autoprefixer = require('autoprefixer');


module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=65000'
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        loader: 'url?limit=65000&mimetype=image/svg+xml'
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        loader: 'url?limit=65000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        loader: 'url?limit=65000&mimetype=application/font-woff2'
      },
      {
        test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        loader: 'url?limit=65000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject'
      }
    ]
  },
  postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
  plugins: []
};
