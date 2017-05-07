const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 65000 }
        }
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 65000 }
        }
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 65000 }
        }
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 65000 }
        }
      },
      {
        test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 65000 }
        }
      },
      {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject'
      }
    ]
  },
  plugins: [
    new StyleLintPlugin({
      context: 'src/client/styles/',
      syntax: 'scss'
    })
  ]
};
