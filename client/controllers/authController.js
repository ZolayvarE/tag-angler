app.controller('authController', ['$scope', '$state', '$http', function($scope, $state, $http) {
  $scope.username = '';
  $scope.password = '';
  $scope.login = function () {
    // console.log(JSON.stringify({ query: $scope.searchTerm }));
    $http({
      method: 'POST',
      url: '/login',
      data: JSON.stringify({
        username: $scope.username,
        password: $scope.password
      })
    }).then(function (result, err) {
      window.localStorage.token = JSON.stringify(result.data.token);
      if (result.data.resp) {
        $state.transitionTo('main');
      }
    }, function (err) {
      console.err(err);
    });

    $scope.username = '';
    $scope.password = '';
  };

  $scope.signup = function () {
    $http({
      method: 'POST',
      url: '/signup',
      data: JSON.stringify({
        username: $scope.username,
        password: $scope.password
      })
    }).then(function (result, err) {
      window.localStorage.token = JSON.stringify(result.data);
    }, function (err) {
      console.err(err);
    });

    $scope.username = '';
    $scope.password = '';
  };
}]);