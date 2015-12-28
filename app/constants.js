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
    })
    .constant('ConditionTypes', {
      ALWAYS: 'always',
      NEVER: 'never',
      SCRIPT: 'script',
      COMPARE: 'compare',
      ARRAY_COMPARE: 'array_compare'
    })
    .constant('ScriptConditionTypes', {
      INLINE: 'inline',
      INDEXED: 'id',
      FILE: 'file'
    })
    .constant('ScriptLanguages', {
      GROOVY: 'groovy',
      JAVASCRIPT: 'javascript',
      PYTHON: 'python',
      EXPRESSION: 'expression',
      MUSTACHE: 'mustache'
    })
    .constant('ComparisonOperators', {
      EQ: 'eq',
      NOT_EQ: 'not_eq',
      GT: 'gt',
      GTE: 'gte',
      LT: 'lt',
      LTE: 'lte'
    });
})();
