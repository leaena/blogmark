angular.module('soloApp')
  .controller('NotesCtrl', function($scope, $routeParams, WebsitesService, Session) {
    $scope.params = $routeParams;
    $scope.websites = "";
    WebsitesService.getWebsites()
    .then(function(websites) {
      $scope.websites = websites;
    });
    $scope.saveNotes = function(){
      var note = {
        ID: $scope.params.id,
        NOTES: $scope.notes
      };
      WebsitesService.addNotes(note);
    };
    $scope.logout = function(){
      Session.logout();
    }
  });