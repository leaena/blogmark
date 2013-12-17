angular.module('soloApp')
.controller('EditCtrl', function($scope, $routeParams, WebsitesService) {
  $scope.params = $routeParams;
  $scope.websites = "";
  WebsitesService.getWebsites()
  .then(function(websites) {
    $scope.websites = websites;
  });
});