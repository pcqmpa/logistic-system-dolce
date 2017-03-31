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
        use: 'url-loader?limit=65000'
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: 'url-loader?limit=65000&mimetype=image/svg+xml'
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff2'
      },
      {
        test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: 'url-loader?limit=65000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9]+)?$/,
        use: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject'
      }
    ]
  },
  plugins: []
};
