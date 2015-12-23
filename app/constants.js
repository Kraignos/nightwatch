(function () {
  'use strict';

  angular
    .module('nightwatch')
    .constant('WatchInputType', {
      SIMPLE: 'simple',
      SEARCH: 'search',
      HTTP: 'http',
      CHAIN: 'chain' 
    });
})();
