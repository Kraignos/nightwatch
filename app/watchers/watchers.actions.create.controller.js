(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCreateCtrl', WatcherActionsCreateCtrl);

    WatcherActionsCreateCtrl.$inject = ['$scope', '$state', 'watchers', 'data'];

    function WatcherActionsCreateCtrl($scope, $state, watchers, data) {
      var watcherActionsCreateVM = this;

      watcherActionsCreateVM.name = data.name
      watcherActionsCreateVM.type = data.type;
      watcherActionsCreateVM[data.type] = {};

      watcherActionsCreateVM.saveAction = saveAction;

      function saveAction() {
        var action = {};
        action[data.type] = watcherActionsCreateVM[data.type];
        watchers.addWatcherAction(watcherActionsCreateVM.name, action);

        $state.go('watch.watchers.actions.list');
      }
    }
})();
