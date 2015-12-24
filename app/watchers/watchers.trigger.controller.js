(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherTriggerCtrl', WatcherTriggerCtrl);

    WatcherTriggerCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherTriggerCtrl($scope, $state, watchers) {
      var watcherTriggerVM = this;

      watcherTriggerVM.type = '';
      watcherTriggerVM.schedule = {};

      watcherTriggerVM.goToInput = goToInput;
      watcherTriggerVM.goToConditions = goToConditions;
      watcherTriggerVM.saveTrigger = saveTrigger;

      watcherTriggerVM.getTriggerTypes = getTriggerTypes;

      function goToInput() {
        $state.go('watch.watchers.input');
      }

      function goToConditions() {
        watchers.setWatcherScheduleTrigger(watcherTriggerVM.schedule);
        $state.go('watch.watchers.conditions');
      }

      function saveTrigger() {
        watchers.setWatcherScheduleTrigger(watcherTriggerVM.schedule);
      }

      function hasTrigger() {
        return _.size(watcherTriggerVM.schedule) > 0;
      }

      function getTriggerTypes() {
        return watchers.getScheduleTriggerTypes();
      }
    }
})();
