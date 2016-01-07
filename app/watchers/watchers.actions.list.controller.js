(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsListCtrl', WatcherActionsListCtrl);

    WatcherActionsListCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'notifications', 'actionsData', 'editable'];

    function WatcherActionsListCtrl($scope, $state, $mdDialog, watchers, notifications, actionsData, editable) {
      var watcherActionsListVM = this;
      var icons = { email: 'mail' };

      watcherActionsListVM.actions = actionsData;
      watcherActionsListVM.hasActions = hasActions;
      watcherActionsListVM.actionIcon = actionIcon;
      watcherActionsListVM.showAction = showAction;
      watcherActionsListVM.deleteAction = deleteAction;
      watcherActionsListVM.canBeEdit = editable;

      function hasActions() {
        return !_.isEmpty(watcherActionsListVM.actions);
      }

      function actionIcon(type) {
        return icons[type];
      }

      function showAction(event, name, type) {
        var info = getController(type);
        $mdDialog.show({
          controller: info.controller,
          controllerAs: info.controllerAs,
          templateUrl: info.templateUrl,
          parent: angular.element(document.body),
          targetEvent: event,
          resolve: {
            data: function() {
              return {
                name: name,
                action: watchers.getWatcherAction(name)
              }
            }
          }
        }).then(function(action) {
          watchers.addWatcherAction(name, action);
        });
      }

      function deleteAction(event, name) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete this action?')
              .textContent('The action named "' + name + '" will be deleted definitively.')
              .ariaLabel('Delete the action')
              .targetEvent(event)
              .ok('Yes, delete it')
              .cancel('No, don\'t do it');
        $mdDialog.show(confirm).then(function() {
          watcherActionsListVM.actions = watchers.deleteAction(name);
          notifications.showSimple('The action with name "' + name + '" has been deleted!');
        });
      }

      function getController(type) {
        return watchers.getControllerForWatcherType(type);
      }
    }
})();
