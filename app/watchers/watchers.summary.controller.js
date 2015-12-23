(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryCtrl', WatcherSummaryCtrl);

    WatcherSummaryCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherSummaryCtrl($scope, $state, watchers) {
      var watcherActionsVM = this;

      watcherActionsVM.goToActions = goToActions;
      watcherActionsVM.saveWatcher = saveWatcher;

      function goToActions() {
        $state.go('watch.watchers.actions');
      }

      function saveWatcher() {
        console.log('check!');
      }
    }
})();
