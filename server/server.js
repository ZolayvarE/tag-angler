var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./database/userSchema.js');
var query = require('./helpers/queryHelper.js')

var app = express();

mongoose.connect('mongodb://localhost:27017', function () { console.log('connected to database!'); });
app.use(bodyParser());
app.use(express.static(__dirname + '/../client'));

app.post('/query', query.grabTags);

var port = process.env.port || 3571;
app.listen(port);

console.log('Listening on port:', port);
