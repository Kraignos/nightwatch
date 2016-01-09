(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('watchers', watchers);

  watchers.$inject = ['WatchInputType', 'SimpleInputType', 'SearchInputType', 'ExpandWildCards', 'ResponseContentType', 'ScheduleTriggerTypes', 'ConditionTypes', 'ScriptConditionTypes', 'ScriptLanguages', 'ComparisonOperators', 'ActionTypes'];

  function watchers(WatchInputType, SimpleInputType, SearchInputType, ExpandWildCards, ResponseContentType, ScheduleTriggerTypes, ConditionTypes, ScriptConditionTypes, ScriptLanguages, ComparisonOperators, ActionTypes) {
    var inputs = {};
    var triggers = {};
    var conditions = {};
    var actions = {};

    var service = {
      getInputTypes: getInputTypes,
      setSimpleWatcherInput: setSimpleWatcherInput,
      setSearchWatcherInput: setSearchWatcherInput,
      setHttpWatcherInput: setHttpWatcherInput,
      setWatcherInput: setWatcherInput,
      setWatcherScheduleTrigger: setWatcherScheduleTrigger,
      setWatcherCondition: setWatcherCondition,
      addWatcherAction: addWatcherAction,
      getWatchInputs: getWatchInputs,
      getWatchTriggers: getWatchTriggers,
      getWatchConditions: getWatchConditions,
      getWatchActions: getWatchActions,
      getWatcherAction: getWatcherAction,
      getWatcherSummary: getWatcherSummary,
      getSimpleInputTypes: getSimpleInputTypes,
      getSearchRequestTypes: getSearchRequestTypes,
      getExpandWildCards: getExpandWildCards,
      getResponseContentTypes: getResponseContentTypes,
      getScheduleTriggerTypes: getScheduleTriggerTypes,
      getConditionTypes: getConditionTypes,
      getScriptTypes: getScriptTypes,
      getScriptLanguages: getScriptLanguages,
      getComparisonOperators: getComparisonOperators,
      getActionTypes: getActionTypes,
      deleteAction: deleteAction,
      loadWatcher: loadWatcher,
      resetWatcher: resetWatcher,
      getControllerForWatcherType: getControllerForWatcherType,
      transformToArray: transformToArray
    }

    return service;

    function setSimpleWatcherInput(input) {
      inputs[WatchInputType.SIMPLE] = input;
    }

    function setSearchWatcherInput(search) {
      inputs[WatchInputType.SEARCH] = search;
    }

    function setHttpWatcherInput(http) {
      inputs[WatchInputType.HTTP] = http;
    }

    function setWatcherInput(input) {
      inputs = input;
    }

    function setWatcherScheduleTrigger(trigger) {
      // Only schedule trigger is availale in ES so far
      triggers['schedule'] = trigger;
    }

    function setWatcherCondition(condition) {
      conditions = condition;
    }

    function addWatcherAction(name, action) {
      actions[name] = action;
    }

    function getWatchInputs() {
      return inputs;
    }

    function getWatchTriggers() {
      return triggers;
    }

    function getWatchConditions() {
      return conditions;
    }

    function getWatchActions() {
      var watcherActions = _.map(_.keys(actions), function(a) {
        return { name: a, type: _.keys(actions[a])[0], action: actions[a] };
      });
      return watcherActions;
    }

    function getWatcherAction(actionName) {
      return actions[actionName];
    }

    function getInputTypes() {
      return [WatchInputType.SIMPLE, WatchInputType.SEARCH, WatchInputType.HTTP];
    }

    function getWatcherSummary() {
      var summary = {};
      summary['input'] = inputs;
      summary['trigger'] = triggers;
      summary['condition'] = conditions;
      summary['actions'] = actions;
      return summary;
    }

    function getSimpleInputTypes() {
      return [SimpleInputType.STRING, SimpleInputType.NUMERIC, SimpleInputType.OBJECT];
    }

    function getSearchRequestTypes() {
      return [
        SearchInputType.DFS_QUERY_AND_FETCH,
        SearchInputType.DFS_QUERY_THEN_FETCH,
        SearchInputType.QUERY_AND_FETCH,
        SearchInputType.QUERY_THEN_FETCH,
        SearchInputType.SCAN
      ];
    }

    function getExpandWildCards() {
      return [
        ExpandWildCards.ALL,
        ExpandWildCards.OPEN,
        ExpandWildCards.CLOSED,
        ExpandWildCards.NONE
      ];
    }

    function getResponseContentTypes() {
      return [
        ResponseContentType.JSON,
        ResponseContentType.YAML,
        ResponseContentType.TEXT
      ];
    }

    function getScheduleTriggerTypes() {
      return [
        ScheduleTriggerTypes.HOURLY,
        ScheduleTriggerTypes.DAILY,
        ScheduleTriggerTypes.WEEKLY,
        ScheduleTriggerTypes.MONTHLY,
        ScheduleTriggerTypes.YEARLY,
        ScheduleTriggerTypes.CRON,
        ScheduleTriggerTypes.INTERVAL
      ];
    }

    function getConditionTypes() {
      return [
        ConditionTypes.ALWAYS,
        ConditionTypes.NEVER,
        ConditionTypes.SCRIPT,
        ConditionTypes.COMPARE,
        ConditionTypes.ARRAY_COMPARE
      ];
    }

    function getScriptTypes() {
      return [
        ScriptConditionTypes.INLINE,
        ScriptConditionTypes.INDEXED,
        ScriptConditionTypes.FILE
      ];
    }

    function getScriptLanguages() {
      return [
        ScriptLanguages.GROOVY,
        ScriptLanguages.JAVASCRIPT,
        ScriptLanguages.PYTHON,
        ScriptLanguages.EXPRESSION,
        ScriptLanguages.MUSTACHE
      ];
    }

    function getComparisonOperators() {
      return [
        ComparisonOperators.EQ,
        ComparisonOperators.NOT_EQ,
        ComparisonOperators.GT,
        ComparisonOperators.GTE,
        ComparisonOperators.LT,
        ComparisonOperators.LTE
      ];
    }

    function getActionTypes() {
      return [
        ActionTypes.EMAIL,
        ActionTypes.WEBHOOK,
        ActionTypes.INDEX,
        ActionTypes.LOGGING,
        ActionTypes.HIPCHAT,
        ActionTypes.SLACK
      ];
    }

    function deleteAction(action) {
      var currentActions = _.keys(actions);
      for (var i =0; i < currentActions.length; i++) {
        if (actions[currentActions[i]] === action) {
          actions.splice(i, 1);
        }
      }
      return getWatchConditions();
    }

    function loadWatcher(watcher) {
      inputs = watcher.watch.input || {};
      triggers = watcher.watch.trigger || {};
      conditions = watcher.watch.condition || {};
      actions = watcher.watch.actions || {};
    }

    function resetWatcher() {
      inputs = {};
      triggers = {};
      conditions = {};
      actions = {};
    }

    function getControllerForWatcherType(type) {
      var controllers = {
          email: {
            controller: 'WatcherActionsEmailCtrl',
            controllerAs: 'watcherActionsEmailVM',
            templateUrl: 'assets/templates/actions/watchers.actions.email.html'
          },
          webhook: {
            controller: 'WatcherActionsWebhookCtrl',
            controllerAs: 'watcherActionsWebhookVM',
            templateUrl: 'assets/templates/actions/watchers.actions.webhook.html'
          },
          index: {
            controller: 'WatcherActionsIndexCtrl',
            controllerAs: 'watcherActionsIndexVM',
            templateUrl: 'assets/templates/actions/watchers.actions.index.html'
          },
          logging: {
            controller: 'WatcherActionsLoggingCtrl',
            controllerAs: 'watcherActionsLoggingVM',
            templateUrl: 'assets/templates/actions/watchers.actions.logging.html'
          },
          hipchat: {
            controller: 'WatcherActionsHipChatCtrl',
            controllerAs: 'watcherActionsHipChatVM',
            templateUrl: 'assets/templates/actions/watchers.actions.hipchat.html'
          },
          slack: {
            controller: 'WatcherActionsSlackCtrl',
            controllerAs: 'watcherActionsSlackVM',
            templateUrl: 'assets/templates/actions/watchers.actions.slack.html'
          }
        };
        return controllers[type];
    }

    function transformToArray(values) {
      return _.map(values.trim().split(','), function(v) {
        return v.trim();
      });
    }
  }
})();
