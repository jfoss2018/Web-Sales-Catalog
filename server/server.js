const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const db = require('./database/index.js');

/*
if (process.env.NODE_ENV === 'development') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      return res.status('200').json({});
    }
    next();
  });
}
*/

app.use(bodyParser.urlencoded({extended: false, limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));

app.use('/api/v1', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({message: err.message});
});

const port = process.env.PORT || 3001;

const server = app.listen(port, function(err) {
  console.log('This app is listening on port ' + port);
});

module.exports = server;
