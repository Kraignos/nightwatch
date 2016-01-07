(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCtrl', WatcherActionsCtrl);

    WatcherActionsCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers'];

    function WatcherActionsCtrl($scope, $state, $mdDialog, watchers) {
      var watcherActionsVM = this;

      watcherActionsVM.name = '';
      watcherActionsVM.type = '';

      watcherActionsVM.goToConditions = goToConditions;
      watcherActionsVM.goToSummary = goToSummary;
      watcherActionsVM.displayCreateForm = displayCreateForm;

      watcherActionsVM.getWatcherActions = getWatcherActions;
      watcherActionsVM.getActionTypes = getActionTypes;

      function goToConditions() {
        $state.go('watch.watchers.create.conditions');
      }

      function goToSummary() {
        $state.go('watch.watchers.create.summary.pretty');
      }

      function displayCreateForm($event) {
        var info = getController(watcherActionsVM.type);
        $mdDialog.show({
          controller: info.controller,
          controllerAs: info.controllerAs,
          templateUrl: info.templateUrl,
          parent: angular.element(document.body),
          targetEvent: event,
          resolve: {
            data: function() {
              return {
                name: watcherActionsVM.name,
                action: {}
              }
            }
          }
        }).then(function(action) {
          watchers.addWatcherAction(watcherActionsVM.name, action);
          $state.go('watch.watchers.create.actions.reload');
        }, function() {
          $state.go('watch.watchers.create.actions.reload');
        });
      }

      function getWatcherActions() {
        return watchers.getWatchActions();
      }

      function getActionTypes() {
        return watchers.getActionTypes();
      }

      function getController(type) {
        return watchers.getControllerForWatcherType(type);
      }
    }
})();
