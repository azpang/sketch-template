const webpack = require('webpack');
const path = require('path');

const config = require('./config');

module.exports = Object.assign(config, {

  entry: [
    'webpack-hot-middleware/client',
    './app/main.js'
  ],

  devtool: 'cheap-source-maps',

  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])

});