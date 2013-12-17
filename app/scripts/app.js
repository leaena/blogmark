'use strict';

angular.module('soloApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngSelect'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // .when('/login', { 
      //   templateUrl: 'views/login.html', 
      //   controller: 'LoginCtrl',
      // })
      // .when('/signup', {
      //   templateUrl: 'views/signup.html'
      //   controller: 'LoginCtrl',
      // })
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
  // .run(function($rootScope, $location, Session) {
  //   $rootScope.$on('$routeChangeStart', function(evt, nextUrl, currentUrl) {
  //     if (
  //         nextUrl.$$route.controller !== 'LoginCtrl' &&
  //         !Session.isLoggedIn()
  //       ) {
  //       $location.path('/login');
  //     }
  //   })
  // })