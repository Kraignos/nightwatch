(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthCtrl', HealthCtrl);

    HealthCtrl.$inject = ['$scope', 'cluster'];

    function HealthCtrl($scope, cluster) {
      var healthVM = this;
      var icons = { green: 'thumb_up', yellow: 'thumbs_up_down', red: 'thumb_down'};
      console.log('cluster: ' + angular.toJson(cluster));

      // Injection though resolve promise in route
      healthVM.cluster = cluster;
      healthVM.color = clusterColor();

      healthVM.clusterIcon = clusterIcon;

      function clusterIcon() {
        return icons[healthVM.cluster.status];
      }
    }
})();
