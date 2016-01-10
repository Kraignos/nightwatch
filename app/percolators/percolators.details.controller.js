(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorDetailsCtrl', PercolatorDetailsCtrl);

    PercolatorDetailsCtrl.$inject = ['$scope', '$mdDialog', 'percolatorJsonData'];

    function PercolatorDetailsCtrl($scope, $mdDialog, percolatorJsonData) {
      var percolatorsDetailsVM = this;

      percolatorsDetailsVM.json = percolatorJsonData;
      percolatorsDetailsVM.cancelForm = cancelForm;
      percolatorsDetailsVM.close = close;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function close() {
        $mdDialog.hide();
      }
    }
})();
