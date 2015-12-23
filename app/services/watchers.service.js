(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('watchers', watchers);

  watchers.$inject = ['WatchInputType'];

  function watchers(WatchInputType) {
    var inputs = {};

    var service = {
      getInputTypes: getInputTypes,
      addWatcherInput: addWatcherInput,
      getWatchInputs: getWatchInputs,
      getWatcherSummary: getWatcherSummary
    }

    return service;

    function addWatcherInput(input) {
      inputs = input;
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
  }
})();
