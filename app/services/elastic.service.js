(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('elastic', elastic);

  elastic.$inject = ['$http'];

  function elastic($http) {
    return {
      health: health,
      indicesHealth: indicesHealth,
      indiceInfo: indiceInfo,
      nodesInfo: nodesInfo,
      percolators: percolators,
      deletePercolator: deletePercolator,
      createPercolator: createPercolator,
      createWatcher: createWatcher,
      watchers: watchers
    };

    function health() {
      return $http.get('http://localhost:9200/_cluster/health');
    }

    function indicesHealth() {
      return $http.get('http://localhost:9200/_cluster/health?level=indices');
    }

    function nodesInfo() {
      return $http.get('http://localhost:9200/_nodes');
    }

    function percolators(indice) {
      return $http.get('http://localhost:9200/' + indice + '/.percolator/_search');
    }

    function deletePercolator(indice, p) {
      return $http.delete('http://localhost:9200/' + indice + '/.percolator/' + p);
    }

    function createPercolator(indice, name, query) {
      return $http.put('http://localhost:9200/' + indice + '/.percolator/' + name, query);
    }

    function indiceInfo(indice) {
      return $http.get('http://localhost:9200/' + indice);
    }

    function createWatcher(name, definition) {
      return $http.put('http://localhost:9200/_watcher/watch/' + name, definition);
    }

    function watchers() {
      return $http.get('http://localhost:9200/.watches/_search');
    }
  }
})();
