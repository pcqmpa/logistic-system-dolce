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
        loader: 'url?limit=10000'
      }
    ]
  },
  postcss: () => [autoprefixer({ browsers: 'last 2 version' })],
  plugins: []
};
