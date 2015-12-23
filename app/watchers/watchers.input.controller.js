(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherInputCtrl', WatcherInputCtrl);

    WatcherInputCtrl.$inject = ['$scope', '$state', 'watchers', 'watcherInputs'];

    function WatcherInputCtrl($scope, $state, watchers, watcherInputs) {
      var watcherInputVM = this;

      watcherInputVM.input = {};
      watcherInputVM.type = _.keys(watcherInputs)[0] || '';
      watcherInputVM.getTypes = getTypes;
      watcherInputVM.goToTrigger = goToTrigger;

      function getTypes() {
        return watchers.getInputTypes();
      }

      function goToTrigger() {
        watcherInputVM.input[watcherInputVM.type] = '';
        watchers.addWatcherInput(watcherInputVM.input);
        $state.go('watch.watchers.trigger');
      }
    }
})();
