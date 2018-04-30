var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors')

global.__root   = __dirname + '/';

app.use(cors());

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var APIController = require(__root + 'api/APIController');
app.use('/api/lunchonline', APIController);

module.exports = app;
