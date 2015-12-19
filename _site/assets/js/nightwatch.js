/*! nightwatch - v1.0.0 - 2015-12-20
* Copyright (c) 2015 ; Licensed  */
(function() {
  'use strict';

  angular.module('nightwatch', ['ngMaterial', 'ui.router']);
})();

(function() {
  'use strict';

  angular.module('nightwatch').config(routes);

  routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    configureRoutes();

    function configureRoutes() {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/index');

      $stateProvider
        .state('index', {
            url: '/',
            template: '<h5>Home</h5>'
        })
        .state('health', {
            url: '/health',
            templateUrl: 'assets/templates/health.html'
        })
        .state('watcher', {
            url: '/watcher',
            template: '<h5>Watcher</h5>'
        })
        .state('query', {
            url: '/query',
            template: '<h5>Query</h5>'
        })
        .state('settings', {
            url: '/settings',
            template: '<h5>Settings</h5>'
        });
    }
  }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .config(configure);

  configure.$inject = ['$mdThemingProvider'];

  function configure($mdThemingProvider) {
    configureTheme();

    function configureTheme() {
      $mdThemingProvider.theme('default');
        //.primaryPalette('brown')
        //.accentPalette('red');
    }
  };
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('NightWatchCtrl', NightWatchCtrl);

    NightWatchCtrl.$inject = ['$scope'];

    function NightWatchCtrl($scope) {
      var nightWatchVM = this;

      nightWatchVM.leftMenuOpen = false;
      nightWatchVM.menu = menu;

      function menu() {
        nightWatchVM.leftMenuOpen != nightWatchVM.leftMenuOpen;
      }
    }
})();
