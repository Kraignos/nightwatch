(function () {
  'use strict';

  angular
    .module('nightwatch')
    .constant('WatchInputType', {
      SIMPLE: 'simple',
      SEARCH: 'search',
      HTTP: 'http',
      CHAIN: 'chain'
    })
    .constant('SimpleInputType', {
      STRING: 'str',
      NUMERIC: 'num',
      OBJECT: 'obj'
    })
    .constant('SearchInputType', {
      DFS_QUERY_AND_FETCH: 'dfs_query_and_fetch',
      DFS_QUERY_THEN_FETCH: 'dfs_query_then_fetch',
      QUERY_AND_FETCH: 'query_and_fetch',
      QUERY_THEN_FETCH: 'query_then_fetch',
      SCAN: 'scan'
    })
    .constant('ExpandWildCards', {
      ALL: 'all',
      OPEN: 'open',
      CLOSED: 'closed',
      NONE: 'none'
    })
    .constant('ResponseContentType', {
      JSON: 'json',
      YAML: 'yaml',
      TEXT: 'text'
    })
    .constant('ScheduleTriggerTypes', {
      HOURLY: 'hourly',
      DAILY: 'daily',
      WEEKLY: 'weekly',
      MONTHLY: 'monthly',
      YEARLY: 'yearly',
      CRON: 'cron',
      INTERVAL: 'interval'
    });
})();
