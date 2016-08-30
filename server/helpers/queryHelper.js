var Youtube = require('youtube-api');
var keys = require('../config/secretKeys.js');
var memCache = {};

module.exports = {
  grabTags: function (req, res) {
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
  }
};