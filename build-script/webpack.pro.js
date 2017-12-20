const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const config = require('../config');
const ROOT_PATH = path.resolve(__dirname, '../');

// production 环境看情况使用 dll，dll 存在一个问题：dll 预先把不常改变的包，提前编译打包，但是对于按需加载的，比如 antd 可能只用到了几个组件，使用 dll 就会全部打入，不过 react 这样可以使用。
module.exports = merge(base, {
  devtool: false,
  output: {
    path: path.join(ROOT_PATH, '/public'),
    publicPath: config.cdn || '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
  },
  plugins: [
    new HtmlIncludeAssetsPlugin({
      assets: [`dll/${require('../public/dll/vendor-manifest.json').name}.js`],
      append: false
    }),
    new HtmlWebpackPlugin({
      title: 'quick-start',
      template: './index.html',
    }),
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: require(ROOT_PATH + '/public/dll/vendor-manifest.json'),
      sourceType: 'var',
    }),
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
    }),
  ],
});
