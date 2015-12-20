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
            templateUrl: 'assets/templates/health.html',
            resolve: {
              cluster: clusterStatus
            },
            controller: 'HealthCtrl',
            controllerAs: 'healthVM'
        })
        .state('health.details', {
          url: '/health_details',
          templateUrl: 'assets/templates/health.details.html',
          resolve: {
            details: clusterDetails
          },
          controller: 'HealthDetailsCtrl',
          controllerAs: 'healthDetailsVM'
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

    clusterStatus.$inject = ['elastic'];
    clusterDetails.$inject = ['elastic'];

    function clusterStatus(elastic) {
      return elastic.health().then(function(response) {
        return response.data;
      });
    }

    function clusterDetails(elastic) {
      return elastic.indicesHealth().then(function(response) {
        return response.data;
      });
    }
  }
})();
