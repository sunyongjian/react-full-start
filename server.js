const http = require('http');
const express = require('express');
const webpack = require('webpack');
const router = express.Router();
const app = express();


app.use(require('morgan')('short'));
app.use("/public", express.static(__dirname + '/public'))
app.use("/dll", express.static(__dirname + '/dll'))
// Step 1: Create & configure a webpack compiler
var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './build-script/webpack.dev');
var compiler = webpack(webpackConfig);

// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
  // noInfo: true, 
  publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
  path: '/__webpack_hmr',
}));

// Do anything you like with the rest of your express application.

router.get('/a', function (req, res, next) {
  res.send('aaa');
});

app.use(router);

var server = http.createServer(app);
server.listen(process.env.PORT || 8888, function () {
  console.log("Listening on %j", server.address());
});

