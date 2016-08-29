app.controller('queryController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.searchTerm = '';
  $scope.list = [];
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
      while ($scope.list.length) {
        $scope.list.pop();
      }
      for (var i = 0; i < result.data.length; i++) {
        $scope.list.push(result.data[i]);
      }
    }, function (err) {
      console.err(err);
    });

    $scope.searchTerm = '';
  };
}]);