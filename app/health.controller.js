(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthCtrl', HealthCtrl);

    HealthCtrl.$inject = ['$scope', 'cluster'];

    function HealthCtrl($scope, cluster) {
      var healthVM = this;
      var icons = { green: 'thumb_up', yellow: 'thumbs_up_down', red: 'thumb_down'};
      var colors = { green: 'greenyellow', yellow: 'yellow', red: 'red'};

      // Injection though resolve promise in route
      healthVM.cluster = cluster;
      healthVM.clusterColor = clusterColor;
      healthVM.clusterIcon = clusterIcon;

      function clusterIcon(status) {
        return icons[status];
      }

      function clusterColor(status) {
        return colors[status];
      }
    }
})();
