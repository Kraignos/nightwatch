(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryCtrl', WatcherSummaryCtrl);

    WatcherSummaryCtrl.$inject = ['$scope', '$state', 'watchers', 'watcherSummary'];

    function WatcherSummaryCtrl($scope, $state, watchers, watcherSummary) {
      var watcherSummaryVM = this;

      watcherSummaryVM.summary = watcherSummary;
      watcherSummaryVM.goToActions = goToActions;
      watcherSummaryVM.saveWatcher = saveWatcher;

      function goToActions() {
        $state.go('watch.watchers.actions.list');
      }

      function saveWatcher() {
        console.log('summary: ' + angular.toJson(watcherSummaryVM.summary));
      }
    }
})();
