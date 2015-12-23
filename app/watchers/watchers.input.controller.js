(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherInputCtrl', WatcherInputCtrl);

    WatcherInputCtrl.$inject = ['$scope', '$state', 'watchers', 'watcherInputs'];

    function WatcherInputCtrl($scope, $state, watchers, watcherInputs) {
      var watcherInputVM = this;

      watcherInputVM.input = {};
      watcherInputVM.type = '';
      watcherInputVM.request = {};

      watcherInputVM.goToTrigger = goToTrigger;
      watcherInputVM.getTypes = getTypes;
      watcherInputVM.getSimpleTypes = getSimpleTypes;
      watcherInputVM.addSimpleInputType = addSimpleInputType;
      watcherInputVM.getPrettyInput = getPrettyInput;
      watcherInputVM.hasInput = hasInput;

      function goToTrigger() {
        $state.go('watch.watchers.trigger');
      }

      function getTypes() {
        return watchers.getInputTypes();
      }

      function getSimpleTypes() {
        return watchers.getSimpleInputTypes();
      }

      function addSimpleInputType(nature, value) {
        var simple = watcherInputVM.input['simple'] || {};
        simple[nature] = nature === 'obj' ? angular.fromJson(value) : value;
        watcherInputVM.input['simple'] = simple;
        watchers.setSimpleWatcherInput(watcherInputVM.input);
      }

      function getPrettyInput() {
        return angular.toJson(watcherInputVM.input, true);
      }

      function hasInput() {
        return _.size(watcherInputVM.input) > 0;
      }
    }
})();
