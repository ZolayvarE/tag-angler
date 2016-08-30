app.controller('queryController', ['$scope', '$state', '$http', function($scope, $state, $http) {
  if (!window.localStorage.token) {
    $state.transitionTo('loginRequired');
  } else {
    $scope.searchTerm = '';
    $scope.add = function () {
      $scope.list.push($scope.searchTerm);
      $scope.searchTerm = '';
    };
    $scope.search = function () {
      $http({
        method: 'POST',
        url: '/query',
        data: JSON.stringify({ 
          query: $scope.searchTerm,
          token: JSON.parse(window.localStorage.token || '"abc"') 
        })
      }).then(function (result) {
        $scope.counter = {};
        $scope.list = [];
        $scope.csv = '';
        for (var i = 0; i < result.data.length; i++) {
          $scope.counter[result.data[i]] = ++$scope.counter[result.data[i]] || 1;
        }
        for (var key in $scope.counter) {
          $scope.list.push({ 
            text: key,
            incidence: $scope.counter[key], 
            wordWeight: Math.min(key.split(' ').length, $scope.counter[key]),
            popularity: $scope.counter[key] + Math.min(key.split(' ').length, $scope.counter[key]) - 1,
          });
        }
        $scope.list.sort(function (a, b) {
          return b.popularity - a.popularity;
        });
      }, function (err) {
        $state.transitionTo('loginRequired');
        err;
      });

      $scope.searchTerm = '';
    };

    $scope.csv = '';
    $scope.genCSV = function () {
      $scope.csv = $scope.list[0].text.slice(0);
      var index = 1;
      while (($scope.csv + $scope.list[index].text).length < 460) {
        $scope.csv += (', ' + $scope.list[index].text);
        index++;
      }
    };
  }
}]);