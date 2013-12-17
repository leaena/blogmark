'use strict';

angular.module('soloApp')
  .controller('BookmarkCtrl', function ($scope, WebsitesService) {
    $scope.websites = "";
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
  });