const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname, '../');


module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(ROOT_PATH, './dll/'),
    library: '[name]',
    publicPath: '/',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(ROOT_PATH, './dll/vendor/[name]-manifest.json'),
      name: '[name]',
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        beautify: false,
        comments: false,
      },
      compressor: {
        warnings: false,
      },
    }),
  ],
};
