const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');

const config = require('../config');
const ROOT_PATH = path.resolve(__dirname, '../');


module.exports = merge(base, {
  devtool: false,
  output: {
    path: path.join(ROOT_PATH, '/public'),
    publicPath: config.cdn || '/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      output: {
        comments: false,
        beautify: false,
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    })
  ]
})