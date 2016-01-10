(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryCtrl', WatcherSummaryCtrl);

    WatcherSummaryCtrl.$inject = ['$scope', '$state', '$mdDialog', 'elastic', 'notifications', 'watcherSummary'];

    function WatcherSummaryCtrl($scope, $state, $mdDialog, elastic, notifications, watcherSummary) {
      var watcherSummaryVM = this;

      watcherSummaryVM.definition = watcherSummary;
      watcherSummaryVM.goToActions = goToActions;
      watcherSummaryVM.saveWatcher = saveWatcher;

      function goToActions() {
        $state.go('watch.watchers.create.actions.list');
      }

      function saveWatcher() {
        $mdDialog.show({
          controller: 'WatcherSaveCtrl',
          controllerAs: 'watcherSaveVM',
          templateUrl: 'assets/templates/watchers.save.html',
          parent: angular.element(document.body),
          targetEvent: event
        }).then(function(name) {
          elastic.createWatcher(name, watcherSummaryVM.definition)
            .success(function() {
              notifications.showSimple('The watcher with name "' + name + '" has successfully been created!');
              $state.go('watch.watchers.list');
            })
            .error(function(error) {
              console.log('Error while creating the watcher with name ' + name + ': ' + error.data || "Request failed");
              console.log('Error status: ' + error.status);
              notifications.showSimple('An error occured while creating the watcher with name "' + name + '"...');
            });
        });
      }
    }
})();
