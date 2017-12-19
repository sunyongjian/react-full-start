const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const ROOT_PATH = path.resolve(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

// dev import dll to faster build

module.exports = merge(base, {
  entry: [ROOT_PATH + '/src/index.jsx', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
  devtool: '#source-map',
  plugins: [
    new HtmlIncludeAssetsPlugin({
      assets: [`dll/${require('../dll/vendor-manifest.json').name}.js`],
      append: false //append vendor.js to html
    }),
    new HtmlWebpackPlugin({
      title: 'quick-start',
      template: './index.html',
    }),
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: require('../dll/vendor-manifest.json'),
      sourceType: 'var',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
