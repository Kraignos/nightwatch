(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthNodesCtrl', HealthNodesCtrl);

    HealthNodesCtrl.$inject = ['$scope', 'nodes'];

    function HealthNodesCtrl($scope, nodes) {
      var healthNodesVM = this;

      // Injection though resolve promise in route
      healthNodesVM.nodes = nodes;
    }
})();
