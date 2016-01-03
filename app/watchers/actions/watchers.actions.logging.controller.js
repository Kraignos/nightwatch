(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsLoggingCtrl', WatcherActionsLoggingCtrl);

    WatcherActionsLoggingCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsLoggingCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsLoggingVM = this;

      watcherActionsLoggingVM.name = data.name;
      watcherActionsLoggingVM.logging = data.action.logging || {};
      watcherActionsLoggingVM.cancelForm = cancelForm;
      watcherActionsLoggingVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ logging: watcherActionsLoggingVM.logging });
      }
    }
})();
