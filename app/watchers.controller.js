(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatchersCtrl', WatchersCtrl);

    WatchersCtrl.$inject = ['$scope'];

    function WatchersCtrl($scope) {
      var watchersVM = this;

      // Injection though resolve promise in route
      //healthNodesVM.nodes = nodes;
    }
})();
