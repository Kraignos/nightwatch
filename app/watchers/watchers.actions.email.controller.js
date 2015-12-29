(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsEmailCtrl', WatcherActionsEmailCtrl);

    WatcherActionsEmailCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsEmailCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsEmailVM = this;

      watcherActionsEmailVM.name = data.name;
      watcherActionsEmailVM.email = data.action;
      watcherActionsEmailVM.cancelForm = cancelForm;
      watcherActionsEmailVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide(watcherActionsEmailVM.email);
      }
    }
})();
