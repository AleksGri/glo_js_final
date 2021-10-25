const path = require('path');

module.exports = {
  entry:'./src/index.js',
  output: {
    filename: 'dev-bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  devServer: {
    open: true,
    port: 8080,
    hot: true,
    writeToDisk: true 
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: ['**/files/**/*.js', '**/node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        },
        exclude: /node-modules/,
      }
    ]
  }

};