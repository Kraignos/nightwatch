(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('watchers', watchers);

  watchers.$inject = ['WatchInputType', 'SimpleInputType', 'SearchInputType', 'ExpandWildCards', 'ResponseContentType', 'ScheduleTriggerTypes', 'ConditionTypes', 'ScriptConditionTypes', 'ScriptLanguages'];

  function watchers(WatchInputType, SimpleInputType, SearchInputType, ExpandWildCards, ResponseContentType, ScheduleTriggerTypes, ConditionTypes, ScriptConditionTypes, ScriptLanguages) {
    var inputs = {};
    var triggers = {};
    var conditions = {};

    var service = {
      getInputTypes: getInputTypes,
      setSimpleWatcherInput: setSimpleWatcherInput,
      setSearchWatcherInput: setSearchWatcherInput,
      setHttpWatcherInput: setHttpWatcherInput,
      setWatcherScheduleTrigger: setWatcherScheduleTrigger,
      setWatcherCondition: setWatcherCondition,
      getWatchInputs: getWatchInputs,
      getWatchTriggers: getWatchTriggers,
      getWatchConditions: getWatchConditions,
      getWatcherSummary: getWatcherSummary,
      getSimpleInputTypes: getSimpleInputTypes,
      getSearchRequestTypes: getSearchRequestTypes,
      getExpandWildCards: getExpandWildCards,
      getResponseContentTypes: getResponseContentTypes,
      getScheduleTriggerTypes: getScheduleTriggerTypes,
      getConditionTypes: getConditionTypes,
      getScriptTypes: getScriptTypes,
      getScriptLanguages: getScriptLanguages,
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

    function setWatcherScheduleTrigger(schedule) {
      // Only schedule trigger is availale in ES so far
      triggers = schedule;
    }

    function setWatcherCondition(condition) {
      conditions = condition;
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

    function getInputTypes() {
      return [WatchInputType.SIMPLE, WatchInputType.SEARCH, WatchInputType.HTTP];
    }

    function getWatcherSummary() {
      var summary = {};
      summary['input'] = inputs;
      summary['trigger'] = triggers;
      summary['condition'] = conditions;
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
        ConditionTypes.COMPARE
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

    function transformToArray(values) {
      return _.map(values.trim().split(','), function(v) {
        return v.trim();
      });
    }
  }
})();
