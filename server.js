var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
  res.render('index');
});


app.listen(3571);
