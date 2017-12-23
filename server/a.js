const express = require('express');

const app = express();

// other server
app.use('/api/list', (req, res, next) => {
  res.send(JSON.stringify({
    list: [{ a: '1', b: '2' }]
  }));
  next();
})


app.listen('1234', () => {
  console.log('1234');
});