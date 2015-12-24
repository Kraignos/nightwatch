(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherTriggerCtrl', WatcherTriggerCtrl);

    WatcherTriggerCtrl.$inject = ['$scope', '$state', 'watchers', 'ScheduleTriggerTypes', 'triggersData'];

    function WatcherTriggerCtrl($scope, $state, watchers, ScheduleTriggerTypes, triggersData) {
      var watcherTriggerVM = this;

      watcherTriggerVM.type = (_.keys(triggersData)[0]) || '';
      watcherTriggerVM.schedule = {};
      watcherTriggerVM.hours = [];
      watcherTriggerVM.dailyData = { times: [], hours: [], minutes: [] };
      watcherTriggerVM.dailyTimes = true;

      watcherTriggerVM.goToInput = goToInput;
      watcherTriggerVM.goToConditions = goToConditions;
      watcherTriggerVM.saveTrigger = saveTrigger;

      watcherTriggerVM.getTriggerTypes = getTriggerTypes;

      loadData(triggersData);

      function goToInput() {
        $state.go('watch.watchers.input');
      }

      function goToConditions() {
        watcherTriggerVM.saveTrigger();
        $state.go('watch.watchers.conditions');
      }

      function saveTrigger() {
        if (watcherTriggerVM.type === ScheduleTriggerTypes.HOURLY) {
          watcherTriggerVM.schedule.hourly = watcherTriggerVM.hours;
        }
        else if (watcherTriggerVM.type === ScheduleTriggerTypes.DAILY) {
          if (watcherTriggerVM.dailyTimes) {
            watcherTriggerVM.schedule.daily = { at: watcherTriggerVM.dailyData.times };
          }
          else {
            watcherTriggerVM.schedule.daily = { at: { hour: watcherTriggerVM.dailyData.hours, minute: watcherTriggerVM.dailyData.minutes }};
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

      function loadData(data) {
        if (!_.isEmpty(_.keys(data))) {
          var type = _.keys(data)[0];

          if (type === ScheduleTriggerTypes.HOURLY) {
            watcherTriggerVM.hours = data.hourly;
          }
          else if (type === ScheduleTriggerTypes.DAILY) {
            loadDailyData(data.daily.at);
          }
        }
      }

      function loadDailyData(trigger) {
        watcherTriggerVM.dailyTimes = _.isArray(trigger);
        if (watcherTriggerVM.dailyTimes) {
          watcherTriggerVM.dailyData = { times: trigger, hours: [], minutes: [] };
        }
        else {
          watcherTriggerVM.dailyData = { times: [], hours: trigger.hour, minutes: trigger.minute };
        }
      }
    }
})();
