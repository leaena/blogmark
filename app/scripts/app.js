'use strict';

angular.module('soloApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.unique'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/notes/:id', {
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl'
      })
      .when('/update/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .when('/bookmarks', {
        templateUrl: 'views/bookmark.html',
        controller: 'BookmarkCtrl'
      })
      .when('/blogmarks', {
        templateUrl: 'views/blogmark.html',
        controller: 'BookmarkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  })