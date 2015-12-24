(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherTriggerCtrl', WatcherTriggerCtrl);

    WatcherTriggerCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherTriggerCtrl($scope, $state, watchers) {
      var watcherTriggerVM = this;

      watcherTriggerVM.type = '';
      watcherTriggerVM.schedule = {};
      watcherTriggerVM.times = [];

      watcherTriggerVM.goToInput = goToInput;
      watcherTriggerVM.goToConditions = goToConditions;
      watcherTriggerVM.saveTrigger = saveTrigger;

      watcherTriggerVM.getTriggerTypes = getTriggerTypes;

      function goToInput() {
        $state.go('watch.watchers.input');
      }

      function goToConditions() {
        watcherTriggerVM.saveTrigger();
        $state.go('watch.watchers.conditions');
      }

      function saveTrigger() {
        if (!_.isUndefined(watcherTriggerVM.schedule.hourly)) {
          watcherTriggerVM.schedule.hourly = { minute: watchers.transformToArray(watcherTriggerVM.schedule.hourly) };
        }
        if (!_.isEmpty(watcherTriggerVM.times)) {
          if (watcherTriggerVM.type === 'daily') {
            watcherTriggerVM.schedule.daily = { at: watcherTriggerVM.times };
          }
        }
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
