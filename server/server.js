var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var path = require('path');
var pug = require('pug');
var User = require('./database/userSchema.js');
var query = require('./helpers/queryHelper.js');
var keys = require('./config/secretKeys.js');
var app = express();

app.use(bodyParser());
app.set('views', path.join(__dirname, '/../client'));
app.set('view engine', 'pug');
app.use(session({
  secret: keys.secret
}));
app.use(express.static(path.join(__dirname, '/../client')));

mongoose.connect('mongodb://localhost:27017', function () { console.log('connected to database!'); });

app.post('/query', function (req, res) {
  // if (!req.session.valid) {
  //   console.log('redirecting!');
  //   res.redirect('/login');
  // } else { 
    query.grabTags(req, res);
  // }
});

app.post('/signup', function (req, res) {

});

app.post('/login', function (req, res) {
  
});

app.get('/login', function (req, res) {
  res.render('login.pug');
});

app.get('/', function (req, res) {
  if (!req.session.valid) {
    res.redirect('/login');
  } else { 
    res.render('index.pug');
  }
});


app.get('/*', function (req, res) {
  if (req.session.valid) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

var port = process.env.port || 3571;
app.listen(port);

console.log('Listening on port:', port);
