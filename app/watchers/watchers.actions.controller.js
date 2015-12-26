(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCtrl', WatcherActionsCtrl);

    WatcherActionsCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherActionsCtrl($scope, $state, watchers) {
      var watcherActionsVM = this;

      watcherActionsVM.goToConditions = goToConditions;
      watcherActionsVM.goToSummary = goToSummary;

      function goToConditions() {
        $state.go('watch.watchers.conditions');
      }

      function goToSummary() {
        $state.go('watch.watchers.summary.pretty');
      }
    }
})();
