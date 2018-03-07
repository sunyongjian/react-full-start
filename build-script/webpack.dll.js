const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const isProd = process.env.NODE_ENV === 'production';
const publicPath = isProd ? path.join(ROOT_PATH, 'public/dll') : path.join(ROOT_PATH, 'dll');

const plugins = [
  new webpack.DllPlugin({
    path: path.join(publicPath, '[name]-manifest.json'),
    name: '[name]_[chunkhash]',
  }),
  new ExtractTextPlugin('[name].css'),
];

if (isProd) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      beautify: false,
      comments: false,
    },
    compressor: {
      warnings: false,
    },
  }));
  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })
  )
}

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      path.join(ROOT_PATH, 'src/commom.js'),// 测试自己的项目代码是否可以打到 vendor 通过 dll 正常使用。
    ],
  },
  output: {
    filename: '[name]_[chunkhash].js',
    path: publicPath,
    library: '[name]_[chunkhash]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
        }),
      },
    ],
  },
  plugins,
};
