(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('watchers', watchers);

  watchers.$inject = ['WatchInputType', 'SimpleInputType'];

  function watchers(WatchInputType, SimpleInputType) {
    var inputs = {};

    var service = {
      getInputTypes: getInputTypes,
      setSimpleWatcherInput: setSimpleWatcherInput,
      getWatchInputs: getWatchInputs,
      getWatcherSummary: getWatcherSummary,
      getSimpleInputTypes: getSimpleInputTypes
    }

    return service;

    function setSimpleWatcherInput(input) {
      inputs[WatchInputType.SIMPLE] = input;
    }

    function getWatchInputs() {
      return inputs;
    }

    function getInputTypes() {
      return [WatchInputType.SIMPLE, WatchInputType.SEARCH, WatchInputType.HTTP, WatchInputType.CHAIN];
    }

    function getWatcherSummary() {
      var summary = {};
      summary['input'] = inputs;
      return summary;
    }

    function getSimpleInputTypes() {
      return [SimpleInputType.STRING, SimpleInputType.NUMERIC, SimpleInputType.OBJECT];
    }
  }
})();
