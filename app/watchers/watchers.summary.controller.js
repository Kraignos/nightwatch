(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryCtrl', WatcherSummaryCtrl);

    WatcherSummaryCtrl.$inject = ['$scope', '$state', '$mdDialog', 'elastic', 'watcherSummary'];

    function WatcherSummaryCtrl($scope, $state, $mdDialog, elastic, watcherSummary) {
      var watcherSummaryVM = this;

      watcherSummaryVM.definition = watcherSummary;
      watcherSummaryVM.goToActions = goToActions;
      watcherSummaryVM.saveWatcher = saveWatcher;

      function goToActions() {
        $state.go('watch.watchers.actions.list');
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
              notifications.showSimple('The percolator with name "' + name + '" has successfully been created!');
            })
            .error(function() {
              notifications.showSimple('An error occured while creating the watcher with name "' + name + '"...');
            });
        });
      }
    }
})();
