(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthCtrl', HealthCtrl);

    HealthCtrl.$inject = ['$scope', 'cluster'];

    function HealthCtrl($scope, cluster) {
      var healthVM = this;
      var icons = { green: 'thumb_up', yellow: 'thumbs_up_down', red: 'thumb_down'};

      // Injection though resolve promise in route
      healthVM.cluster = cluster;

      healthVM.clusterIcon = clusterIcon;

      function clusterIcon(status) {
        return icons[status];
      }
    }
})();
