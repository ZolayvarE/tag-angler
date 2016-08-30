var app = angular.module('TagAngler', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('');

  $stateProvider
    .state('login', {
      templateUrl: '/views/loginView.html'
    })
    .state('main', {
      templateUrl: '/views/mainView.html'
    })
    .state('signup', {
      templateUrl: '/views/signupView.html'
    })
});