'use strict';

angular.module('soloApp')
  .controller('BookmarkCtrl', function ($scope, WebsitesService) {
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
  });