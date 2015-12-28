(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCreateCtrl', WatcherActionsCreateCtrl);

    WatcherActionsCreateCtrl.$inject = ['$scope', '$state', 'watchers', 'type'];

    function WatcherActionsCreateCtrl($scope, $state, watchers, type) {
      var watcherActionsCreateVM = this;

      watcherActionsCreateVM.type = type;
      watcherActionsCreateVM[type] = {};

      watcherActionsCreateVM.saveAction = saveAction;

      function saveAction() {
        watchers.addWatcherAction(watcherActionsCreateVM.type, watcherActionsCreateVM[watcherActionsCreateVM.type]);
        $state.go('watch.watchers.actions.list');
      }
    }
})();
