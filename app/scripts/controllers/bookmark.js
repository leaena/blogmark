'use strict';

angular.module('soloApp')
  .controller('BookmarkCtrl', function ($rootScope, $scope, WebsitesService, Session) {
    $scope.websites = "";
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
    $scope.add = function(website){
      $rootScope.selected = $rootScope.selected || [];
      if($rootScope.selected.indexOf(website) === -1){
        $rootScope.selected.push(website);
      }
    };
    $scope.remove = function(website){
      $rootScope.selected = $rootScope.selected || [];
      var loc = $rootScope.selected.indexOf(website);
      if(loc !== -1){
        $rootScope.selected.splice(loc,1);
      }
    };
    $scope.logout = function(){
      Session.logout();
    }
  });