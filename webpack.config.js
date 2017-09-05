const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

const webpack = require('webpack');

module.exports = {
  entry: {
    upload: ['./src/index.jsx', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: config.cdn || '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  devtool: '#source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'quick-start',
      template: 'index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};
