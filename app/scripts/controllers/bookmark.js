'use strict';

angular.module('soloApp')
  .controller('BookmarkCtrl', function ($scope, WebsitesService) {
    $scope.categories = [];
    $scope.selected = [];
    $scope.mark = "";
    $scope.websites = "";
    WebsitesService.getWebsites()
    .then(function(websites) {
      // websites.forEach()
      // if($scope.categories.indexOf(websites.category) === -1){
      //   $scope.categories.push(websites.category);
      // }
      $scope.websites = websites;
    });
  });