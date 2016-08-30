app.controller('queryController', ['$scope', '$state', '$http', function($scope, $state, $http) {
  $scope.searchTerm = '';
  $scope.list = [];
  $scope.counter = {};
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
      for (var i = 0; i < result.data.length; i++) {
        $scope.counter[result.data[i]] = ++$scope.counter[result.data[i]] || 1;
      }
      for (var key in $scope.counter) {
        $scope.list.push({ text: key, count: $scope.counter[key] });
      }
    }, function (err) {
      $state.transitionTo('login');
      err;
    });

    $scope.searchTerm = '';
  };
}]);