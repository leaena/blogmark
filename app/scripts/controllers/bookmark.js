'use strict';

angular.module('soloApp')
  .controller('BookmarkCtrl', function ($rootScope, $scope, WebsitesService) {
    WebsitesService.getWebsites()
    .then(function(websites) {
      // websites.forEach()
      // if($scope.categories.indexOf(websites.category) === -1){
      //   $scope.categories.push(websites.category);
      // }
      $scope.websites = websites;
    });
    $scope.add = function(index){
      $rootScope.selected = $rootScope.selected || [];
      var website = $scope.websites[index];
      if($rootScope.selected.indexOf(website.ID) === -1){
        $rootScope.selected.push(website.ID);
      }
    };
    $scope.remove = function(index){
      $rootScope.selected = $rootScope.selected || [];
      var website = $scope.websites[index];
      var loc = $rootScope.selected.indexOf(website.ID);
      if(loc !== -1){
        $rootScope.selected.splice(loc,1);
      }
    };
  });