(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsHipChatCtrl', WatcherActionsHipChatCtrl);

    WatcherActionsHipChatCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsHipChatCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsHipChatVM = this;

      watcherActionsHipChatVM.name = data.name;
      watcherActionsHipChatVM.hipchat = data.action.hipchat || {};
      watcherActionsHipChatVM.cancelForm = cancelForm;
      watcherActionsHipChatVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ hipchat: watcherActionsHipChatVM.hipchat });
      }
    }
})();
