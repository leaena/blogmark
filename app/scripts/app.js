'use strict';

angular.module('soloApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/bookmarks', {
        templateUrl: 'views/bookmark.html',
        controller: 'BookmarkCtrl'
      })
      .when('/blogmarks', {
        templateUrl: 'views/blogmark.html',
        controller: 'BlogmarkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
