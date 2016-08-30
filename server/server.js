var express = require('express');
var bodyParser = require('body-parser');
var Youtube = require('youtube-api');
var mongoose = require('mongoose');
var keys = require('./config/secretKeys.js');
var User = require('./database/userSchema.js');

var app = express();

mongoose.connect('mongodb://localhost/myapp', function () { console.log('connected to database!'); });
app.use(bodyParser());
app.use(express.static(__dirname + '/../client'));

var memCache = {};

app.post('/query', function (req, res) {
  var searchTerm = req.body.query || 'aardvark';
  if (memCache[searchTerm]) {
    res.send(memCache[searchTerm]);
  } else {
    Youtube.search.list({
      part: 'id',
      maxResults: 15,
      q: searchTerm,
      type: 'video',
      key: keys.youtube
    }, function (error, results) {
      var videos = results.items;
      var videoIds = [];
      var getVideoId = function (videoObject) { 
        return videoObject.id.videoId; 
      };
      for (var i = 0; i < videos.length; i++) {
        videoIds.push(getVideoId(videos[i]));
      }
      Youtube.videos.list({
        part: 'snippet',
        maxResults: 15,
        id: videoIds.join(','),
        key: keys.youtube
      }, function (error, results, body) {
        var videos = results.items;
        var allTags = [];
        var getVideoTags = function (videoObject) {
          return videoObject.snippet.tags;
        };
        for (var i = 0; i < videos.length; i++) {
          var currentTags = getVideoTags(videos[i]);
          if (currentTags) {
            allTags = allTags.concat(currentTags);            
          }
        }
        memCache[searchTerm] = allTags;
        console.log('Serving tags for "' + searchTerm + '" from YouTube query');
        res.send(allTags);
      });
    });
  }
});

var port = process.env.port || 3571;
app.listen(port);

console.log('Listening on port:', port);
