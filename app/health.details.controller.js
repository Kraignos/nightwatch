(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthDetailsCtrl', HealthDetailsCtrl);

    HealthDetailsCtrl.$inject = ['$scope', 'details'];

    function HealthDetailsCtrl($scope, details) {
      var healthDetailsVM = this;
      var icons = { green: 'thumb_up', yellow: 'thumbs_up_down', red: 'thumb_down'};

      // Injection though resolve promise in route
      healthDetailsVM.details = details;
      healthDetailsVM.clusterIcon = clusterIcon;
      healthDetailsVM.indiceName = indiceName;

      angular.forEach(healthDetailsVM.details.indices, function(detail, index) {
        console.log('detail: ' + _.keys(healthDetailsVM.details.indices));
      });

      function clusterIcon(status) {
        return icons[status];
      }

      function indiceName(index) {
        return _.keys(healthDetailsVM.details.indices)[index];
      }
    }
})();
