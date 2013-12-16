angular.module('soloApp')
  .controller('LoginCtrl', function($scope, $location, Session) {
    $scope.login = function() {
      Session.login($scope.username, $scope.password)
      .then(function(data) {
        // Login was successful
        Session.setAuthenticated(data);
        $location.path('/');
      }, function(reason) {
        // Login unsuccessful
        $scope.login.error = reason;
      })
    }
  });
