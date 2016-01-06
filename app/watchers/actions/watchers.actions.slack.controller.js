(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsSlackCtrl', WatcherActionsSlackCtrl);

    WatcherActionsSlackCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsSlackCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsSlackVM = this;

      watcherActionsSlackVM.name = data.name;
      watcherActionsSlackVM.slack = data.action.slack || {};
      watcherActionsSlackVM.to = [];
      watcherActionsSlackVM.cancelForm = cancelForm;
      watcherActionsSlackVM.updateAction = updateAction;

      loadRooms();

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        if (!_.isEmpty(watcherActionsSlackVM.to)) {
          watcherActionsSlackVM.slack.message.to = watcherActionsSlackVM.to;
        }
        $mdDialog.hide({ slack: watcherActionsSlackVM.slack });
      }

      function loadRooms() {
        if (!_.isUndefined(watcherActionsSlackVM.slack.message) && !_.isUndefined(watcherActionsSlackVM.slack.message.to)) {
          watcherActionsSlackVM.to = watcherActionsSlackVM.slack.message.to;
        }
      }
    }
})();
