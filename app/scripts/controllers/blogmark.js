angular.module('soloApp')
  .controller('BlogmarkCtrl', function ($scope, WebsitesService) {
    $scope.submitted = false;
    $scope.urls = [];
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
    $scope.getBookmarks = function(){
      $scope.submitted = true;
    }
  });