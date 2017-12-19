const path = require('path');
const webpack = require('webpack');
const ROOT_PATH = path.resolve(__dirname, '../');
const isProd = process.env.NODE_ENV === 'production';
const publicPath = isProd ? path.join(ROOT_PATH, 'public/dll') : path.join(ROOT_PATH, 'dll');

const plugins = [new webpack.DllPlugin({
  path: path.join(publicPath, '[name]-manifest.json'),
  name: '[name]_[chunkhash]',
})];

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
}

// 看情况拆分出三个 dll 文件， base，dev，prod
module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    filename: '[name]_[chunkhash].js',
    path: publicPath,
    library: '[name]_[chunkhash]',
    publicPath: '/',
  },
  plugins,
};
