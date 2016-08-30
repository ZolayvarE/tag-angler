var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var pug = require('pug');
var bcrypt = require('bcrypt');
var User = require('./database/userSchema.js');
var query = require('./helpers/queryHelper.js');
var auth = require('./helpers/authHelper.js');
var keys = require('./config/secretKeys.js');
var app = express();

app.use(bodyParser());
app.set('views', path.join(__dirname, '/../client'));
app.set('view engine', 'pug');

mongoose.connect('mongodb://localhost:27017', function () { console.log('connected to database!'); });

app.post('/query', function (req, res) {
  console.log(req.body.token);
  console.log(auth.isValid(req.body.token));
  if (auth.isValid(req.body.token)) {
    query.grabTags(req, res);
  } else {
    res.status(401);
    res.end();
  }
});

app.post('/signup', function (req, res) {
  bcrypt.hash(req.body.password, 10, function (err, result) {
    new User({
      username: req.body.username,
      password: result
    }).save().then(function () {
      res.send(auth.validToken());
    });
  });
});

app.post('/login', function (req, res) {
  User.findOne({ username: req.body.username })
    .then(function (data) {
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        if (result) {
          res.send({ 
            resp: true,
            token: auth.validToken()
          });
        } else {
          res.send({
            resp: false,
            token: auth.invalidToken()
          });
        }
      });
    })
    .catch(function (err) {
      bcrypt.hash('invalid', 10, function (err, hash) {
        res.send(hash);
      });
    });
});

app.use(express.static(path.join(__dirname, '/../client')));

app.get('/*', function (req, res) {
  res.redirect('/login');
});

app.post('/*', function (req, res) {
  res.redirect('/login');
});

var port = process.env.port || 3571;
app.listen(port);

console.log('Listening on port:', port);
