app.controller('authController', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.username = '';
  $scope.password = '';
  $scope.login = function () {
    // console.log(JSON.stringify({ query: $scope.searchTerm }));
    $http({
      method: 'POST',
      url: '/login',
      data: JSON.stringify({ username: $scope.username, password: $scope.password })
    }).then(function (result) {

    });
  };

  $scope.signup = function () {
    $http({
      method: 'POST',
      url: '/signup',
      data: JSON.stringify({ username: $scope.username, password: $scope.password })
    }).then(function (result) {

    });
  };
}]);