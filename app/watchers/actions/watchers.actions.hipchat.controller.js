(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsHipChatCtrl', WatcherActionsHipChatCtrl);

    WatcherActionsHipChatCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsHipChatCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsHipChatVM = this;

      watcherActionsHipChatVM.name = data.name;
      watcherActionsHipChatVM.hipchat = data.action.hipchat || {};
      watcherActionsHipChatVM.rooms = [];
      watcherActionsHipChatVM.cancelForm = cancelForm;
      watcherActionsHipChatVM.updateAction = updateAction;

      loadRooms();

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        if (!_.isEmpty(watcherActionsHipChatVM.rooms)) {
          watcherActionsHipChatVM.hipchat.message.room = watcherActionsHipChatVM.rooms;
        }
        $mdDialog.hide({ hipchat: watcherActionsHipChatVM.hipchat });
      }

      function loadRooms() {
        if (!_.isUndefined(watcherActionsHipChatVM.hipchat.message) && !_.isUndefined(watcherActionsHipChatVM.hipchat.message.room)) {
          watcherActionsHipChatVM.rooms = watcherActionsHipChatVM.hipchat.message.room;
        }
      }
    }
})();
