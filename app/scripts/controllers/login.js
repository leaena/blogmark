'use strict';

angular.module('soloApp')
  .controller('LoginCtrl', function($scope, $location, Session) {
  $scope.login = function() {
    Session.login($scope.username, $scope.password)
    .then(function(data) {
      Session.setAuthenticated(data);
      $location.path('/');
    }, function(reason) {
      $scope.login.error = reason;
    })
  };
  $scope.signup = function() {
    Session.signup($scope.username, $scope.password)
    .then(function(data) {
      Session.setAuthenticated(data);
      $location.path('/');
    }, function(reason) {
      $scope.login.error = reason;
    })
  }
});
