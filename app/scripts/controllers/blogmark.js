angular.module('soloApp')
  .controller('BlogmarkCtrl', function ($scope, WebsitesService) {
    $scope.websites = "";
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
  });