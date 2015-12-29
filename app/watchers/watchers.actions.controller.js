(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCtrl', WatcherActionsCtrl);

    WatcherActionsCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherActionsCtrl($scope, $state, watchers) {
      var watcherActionsVM = this;

      watcherActionsVM.name = '';
      watcherActionsVM.type = '';

      watcherActionsVM.goToConditions = goToConditions;
      watcherActionsVM.goToSummary = goToSummary;
      watcherActionsVM.goToCreate = goToCreate;

      watcherActionsVM.getWatcherActions = getWatcherActions;
      watcherActionsVM.getActionTypes = getActionTypes;

      function goToConditions() {
        $state.go('watch.watchers.conditions');
      }

      function goToSummary() {
        $state.go('watch.watchers.summary.pretty');
      }

      function goToCreate() {
        $state.go('watch.watchers.actions.create', { name: watcherActionsVM.name, type: watcherActionsVM.type });
      }

      function getWatcherActions() {
        return watchers.getWatchActions();
      }

      function getActionTypes() {
        return watchers.getActionTypes();
      }
    }
})();
