angular.module('soloApp')
  .controller('BlogmarkCtrl', function ($scope, WebsitesService) {
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
  });