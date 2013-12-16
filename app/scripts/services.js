angular.module('soloApp')
.factory('WebsitesService', function($q, $http){
  var service = {
    getWebsites: function(){
      var d = $q.defer();
      $http({
        method: 'GET',
        url: '/websites'
      })
      .success(function(data){
        d.resolve(data);
      })
      .error(function(reason){
        d.reject(reason);
      })
      return d.promise;
    }
  };
  return service;
})
.factory('Session', function($q, $http, $cookieStore) {
  var service = {
    currentUser: null,
    isLoggedIn: function() {
      return !!service.currentUser;
    },
    setAuthenticated: function (user) {
      $cookieStore.put('user', user);
      service.currentUser = user;
    },
    login: function(username, password) {
      var d = $q.defer();
      $http({
        method: 'post',
        url: '/api/login',
        params: {
          username: username,
          password: password
        }
      }).success(function(data) {
        d.resolve(data);
      }).error(function(reason) {
        d.reject(reason);
      })
      return d.promise;
    }
  };
  service.currentUser = $cookieStore.get('user');
  return service;
});