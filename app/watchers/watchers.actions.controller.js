(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCtrl', WatcherActionsCtrl);

    WatcherActionsCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherActionsCtrl($scope, $state, watchers) {
      var watcherSummaryVM = this;

      watcherSummaryVM.goToConditions = goToConditions;
      watcherSummaryVM.goToSummary = goToSummary;

      function goToConditions() {
        $state.go('watch.watchers.conditions');
      }

      function goToSummary() {
        $state.go('watch.watchers.summary');
      }
    }
})();
