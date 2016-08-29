app.controller('queryController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.searchTerm = '';
  $scope.list = [];
  $scope.counter = {};
  $scope.add = function () {
    $scope.list.push($scope.searchTerm);
    $scope.searchTerm = '';
  };
  $scope.search = function () {
    // console.log(JSON.stringify({ query: $scope.searchTerm }));
    $http({
      method: 'POST',
      url: '/query',
      data: JSON.stringify({ query: $scope.searchTerm })
    }).then(function (result) {
      $scope.counter;
      $scope.list = result.data;
      for (var i = 0; i < result.data.length; i++) {
        $scope.counter[result.data[i]] = ++$scope.counter[result.data[i]] || 1;
      }
    }, function (err) {
      console.err(err);
    });

    $scope.searchTerm = '';
  };
}]);