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
      getWatcher: getWatcher,
      watchers: watchers
    };

    function health() {
      return $http.get('/_cluster/health');
    }

    function indicesHealth() {
      return $http.get('/_cluster/health?level=indices');
    }

    function nodesInfo() {
      return $http.get('/_nodes');
    }

    function percolators(indice) {
      return $http.get('/' + indice + '/.percolator/_search');
    }

    function deletePercolator(indice, p) {
      return $http.delete('/' + indice + '/.percolator/' + p);
    }

    function createPercolator(indice, name, query) {
      return $http.put('/' + indice + '/.percolator/' + name, query);
    }

    function indiceInfo(indice) {
      return $http.get('/' + indice);
    }

    function createWatcher(name, definition) {
      return $http.put('/_watcher/watch/' + name, definition);
    }

    function getWatcher(name) {
      return $http.get('/_watcher/watch/' + name);
    }

    function watchers() {
      return $http.get('/.watches/_search');
    }
  }
})();
