var express = require('express');
var bodyParser = require('body-parser');
var Youtube = require('youtube-api');
var keys = require('./secretKeys.js');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/client'));

var memCache = {};

app.get('/query', function (req, res) {
  var searchTerm = req.body.query || 'aardvark';
  if (memCache[searchTerm]) {
    res.send(memCache[searchTerm]);
  } else {
    Youtube.search.list({
      part: 'id',
      maxResults: 10,
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
      
      // Youtube.video.list({
      //   part: 'snippet',
      //   maxResults: 10,
      //   id: videoIds,
        
      // }, function (error, results) {

      // });

      res.send(videoIds);
    });
  }
});


app.listen(3571);
