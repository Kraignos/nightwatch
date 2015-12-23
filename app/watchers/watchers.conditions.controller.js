(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherConditionsCtrl', WatcherConditionsCtrl);

    WatcherConditionsCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherConditionsCtrl($scope, $state, watchers) {
      var watcherConditionsVM = this;

      watcherConditionsVM.goToTrigger = goToTrigger;
      watcherConditionsVM.goToActions = goToActions;

      function goToTrigger() {
        $state.go('watch.watchers.trigger');
      }

      function goToActions() {
        $state.go('watch.watchers.actions');
      }
    }
})();
