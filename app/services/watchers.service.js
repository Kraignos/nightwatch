(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('watchers', watchers);

  watchers.$inject = ['WatchInputType', 'SimpleInputType', 'SearchInputType', 'ExpandWildCards'];

  function watchers(WatchInputType, SimpleInputType, SearchInputType, ExpandWildCards) {
    var inputs = {};

    var service = {
      getInputTypes: getInputTypes,
      setSimpleWatcherInput: setSimpleWatcherInput,
      setSearchWatcherInput: setSearchWatcherInput,
      getWatchInputs: getWatchInputs,
      getWatcherSummary: getWatcherSummary,
      getSimpleInputTypes: getSimpleInputTypes,
      getSearchRequestTypes: getSearchRequestTypes,
      getExpandWildCards: getExpandWildCards
    }

    return service;

    function setSimpleWatcherInput(input) {
      inputs[WatchInputType.SIMPLE] = input;
    }

    function setSearchWatcherInput(search) {
      inputs[WatchInputType.SEARCH] = search;
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
  }
})();
