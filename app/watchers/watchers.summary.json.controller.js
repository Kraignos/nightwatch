(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryJsonController', WatcherSummaryJsonController);

    WatcherSummaryJsonController.$inject = ['$scope', '$mdDialog', 'jsonData'];

    function WatcherSummaryJsonController($scope, $mdDialog, jsonData) {
      var watcherJsonVM = this;

      watcherJsonVM.json = jsonData;
      watcherJsonVM.cancelForm = cancelForm;
      watcherJsonVM.close = close;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function close() {
        $mdDialog.hide();
      }
    }
})();
