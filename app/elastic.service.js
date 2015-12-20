(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('elastic', elastic);

  elastic.$inject = ['$http'];

  function elastic($http) {
    return {
      health: health
    };

    function health() {
      return $http.get('http://localhost:9200/_cluster/health');
    }
  }
})();
