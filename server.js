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
    console.log('Serving tags for "' + searchTerm + '" from memCache');
    res.send(memCache[searchTerm]);
  } else {
    console.log('Finding video ids for: "' + searchTerm + '"');
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
      
      console.log('Looking up tags for: "' + searchTerm + '"');
      Youtube.videos.list({
        part: 'snippet',
        maxResults: 10,
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

      // res.send(videoIds);
    });
  }
});


app.listen(3571);
