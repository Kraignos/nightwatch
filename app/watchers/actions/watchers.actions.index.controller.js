(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsIndexCtrl', WatcherActionsIndexCtrl);

    WatcherActionsIndexCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsIndexCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsIndexVM = this;

      watcherActionsIndexVM.name = data.name;
      watcherActionsIndexVM.index = data.action.index || {};
      watcherActionsIndexVM.cancelForm = cancelForm;
      watcherActionsIndexVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ index: watcherActionsIndexVM.index });
      }
    }
})();
