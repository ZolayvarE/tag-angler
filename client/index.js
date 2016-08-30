var app = angular.module('TagAngler', ['ui.router']);

app.config(function ($stateProvider) {
  $stateProvider
    .when('/', {
      templateUrl: '/views/mainView'
    })
    .when('/login', {
      templateUrl: '/views/loginView.html'
    })
    .when('/main', {
      templateUrl: '/views/mainView.html'
    });
});