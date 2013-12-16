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
});