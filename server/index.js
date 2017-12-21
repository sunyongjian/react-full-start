const http = require('http');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('mz/fs');
const router = express.Router();
const mockjs = require('mockjs');
const app = express();
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


// proxy
router.use(async (req, res, next) => {
  if(host !== 'localhost') {
    console.log(host, 'host');
    next();
  } else {
    const { path } = req;
    const filename = `${ROOT_PATH}/server/mock/${path}.json`;
    try {// mock data
      console.log(filename, 'path');
      
      const s = await fs.stat(filename);
      console.log(s.isFile(), 'isfile');
      if(!s.isFile()) {
        return next();
      }
      fs.readFile(filename, 'utf-8').then(json => {
        const data = mockjs.mock(JSON.parse(json.toString()));
        res.send(data);
      })
    } catch(e) {
      console.log(e, 'error');
    }
    
  }
})
// Do anything you like with the rest of your express application.


app.use(router);

var server = http.createServer(app);
server.listen(process.env.PORT || 8888, function () {
  console.log("Listening on %j", server.address());
});

