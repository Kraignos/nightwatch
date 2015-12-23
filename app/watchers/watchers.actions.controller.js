(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCtrl', WatcherActionsCtrl);

    WatcherActionsCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherActionsCtrl($scope, $state, watchers) {
      var watcherActionsVM = this;

      watcherActionsVM.goToConditions = goToConditions;
      watcherActionsVM.saveWatcher = saveWatcher;

      function goToConditions() {
        $state.go('watch.watchers.conditions');
      }

      function saveWatcher() {
        console.log('check!');
      }
    }
})();
