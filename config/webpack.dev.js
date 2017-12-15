const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = merge(base, {
  entry: [ROOT_PATH + '/src/index.jsx', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})