(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsListCtrl', WatcherActionsListCtrl);

    WatcherActionsListCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'actionsData'];

    function WatcherActionsListCtrl($scope, $state, $mdDialog, watchers, actionsData) {
      var watcherActionsListVM = this;
      var icons = { email: 'mail' };

      watcherActionsListVM.actions = actionsData;
      watcherActionsListVM.hasActions = hasActions;
      watcherActionsListVM.actionIcon = actionIcon;
      watcherActionsListVM.showAction = showAction;

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

      function getController(type) {
        var controllers = {
          email: {
            controller: 'WatcherActionsEmailCtrl',
            controllerAs: 'watcherActionsEmailVM',
            templateUrl: 'assets/templates/actions/watchers.actions.email.html'
          },
          webhook: {
            controller: 'WatcherActionsWebhookCtrl',
            controllerAs: 'watcherActionsWebhookVM',
            templateUrl: 'assets/templates/actions/watchers.actions.webhook.html'
          }
        };
        return controllers[type];
      }
    }
})();
