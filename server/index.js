const http = require('http');
const url = require('url');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('mz/fs');
const mockjs = require('mockjs');
const proxy = require('express-http-proxy');

const app = express();
const router = express.Router();

const config = require('../config');
const ROOT_PATH = path.resolve(__dirname, '../');
const host = process.argv[2] || 'localhost';
app.use(require('morgan')('short'));

app.use("/public", express.static(ROOT_PATH + '/public'));
app.use("/dll", express.static(ROOT_PATH+ '/dll'));
// Step 1: Create & configure a webpack compiler
var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../build-script/webpack.dev');
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

if (host !== 'localhost') {// proxy
  const { host: hostConfig } = config.proxy;
  const cfg = hostConfig[host];
  const { name, port = '' } = cfg;
  console.log(`${name}:${port}`, 'host');

  app.use(proxy(`${name}:${port}`, {
    proxyReqPathResolver: function (req, res) {
      const pathname = url.parse(req.url).path;
      console.log(pathname, "pathname");
      return pathname;
    }
  }));
} else {// local mock
  router.use(async (req, res, next) => {
    const { path } = req;
    const filename = `${ROOT_PATH}/server/mock/${path}.json`;
    try {// mock data
      const s = await fs.stat(filename);
      if (!s.isFile()) {
        return next();
      }
      fs.readFile(filename, 'utf-8').then(json => {
        const data = mockjs.mock(JSON.parse(json.toString()));
        res.send(data);
      })
    } catch (e) {
      console.log(e, 'error');
    }
  })
}

// Do anything you like with the rest of your express application.


app.use(router);

var server = http.createServer(app);
server.listen(process.env.PORT || config.port || 1234, function () {
  console.log("Listening on %j", server.address());
});

