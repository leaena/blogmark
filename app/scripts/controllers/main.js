'use strict';

angular.module('soloApp')
  .controller('MainCtrl', function ($scope, Session) { 
    $scope.logout = function(){
      Session.logout();
    }
  });
