angular.module('soloApp')
  .controller('EditCtrl', function($scope, $routeParams, WebsitesService, Session) {
    $scope.params = $routeParams;
    $scope.websites = "";
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
    $scope.logout = function(){
      Session.logout();
    };
  });