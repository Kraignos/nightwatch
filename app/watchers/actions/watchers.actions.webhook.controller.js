(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsWebhookCtrl', WatcherActionsWebhookCtrl);

    WatcherActionsWebhookCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsWebhookCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsWebhookVM = this;

      watcherActionsWebhookVM.name = data.name;
      watcherActionsWebhookVM.webhook = data.action.webhook;
      watcherActionsWebhookVM.cancelForm = cancelForm;
      watcherActionsWebhookVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ webhook: watcherActionsWebhookVM.webhook });
      }
    }
})();
