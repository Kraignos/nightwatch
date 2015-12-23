(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherTriggerCtrl', WatcherTriggerCtrl);

    WatcherTriggerCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherTriggerCtrl($scope, $state, watchers) {
      var watcherTriggerVM = this;

      watcherTriggerVM.goToInput = goToInput;
      watcherTriggerVM.goToConditions = goToConditions;

      function goToInput() {
        $state.go('watch.watchers.input');
      }

      function goToConditions() {
        $state.go('watch.watchers.conditions');
      }
    }
})();
