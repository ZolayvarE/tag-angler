var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var User = require('./database/userSchema.js');
var query = require('./helpers/queryHelper.js');
var keys = require('./config/secretKeys.js');

var app = express();

mongoose.connect('mongodb://localhost:27017', function () { console.log('connected to database!'); });
app.use(bodyParser());
app.use(express.static(__dirname + '/../client'));
app.use(session({
  secret: keys.secret
}));

app.post('/query', function (req, res) {
  if (!req.session.valid) {
    console.log('redirecting!');
    res.redirect('/login');
  } else { 
    query.grabTags(req, res);
  }
});

app.get('/login', function (req, res) {
  res.send('oh boy. here we go again.');
});

app.get('/', function (req, res) {
  if (!req.session.valid) {
    res.redirect('/login');
  } else { 
    res.render('index.html');
  }
});

app.get('/asdf', function (req, res) {
  res.send('you dun goofed');
});

var port = process.env.port || 3571;
app.listen(port);

console.log('Listening on port:', port);
