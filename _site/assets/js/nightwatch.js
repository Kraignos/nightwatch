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
            views: {
              'cluster': {
                templateUrl: 'assets/templates/health.html',
                resolve: {
                  cluster: clusterStatus
                },
                controller: 'HealthCtrl',
                controllerAs: 'healthVM'
              },
              'nodes': {
                templateUrl: 'assets/templates/health.nodes.html',
                resolve: {
                  nodes: clusterNodes
                },
                controller: 'HealthNodesCtrl',
                controllerAs: 'healthNodesVM'
              }
            }
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
        .state('health.indices', {
          url: '/health_indices',
          templateUrl: 'assets/templates/health.indices.html',
          resolve: {
            indices: clusterIndices
          },
          controller: 'HealthIndicesCtrl',
          controllerAs: 'healthIndicesVM'
        })
        .state('health.nodes', {
          url: '/health_nodes',
          templateUrl: 'assets/templates/health.nodes.html',
          resolve: {
            nodes: clusterNodes
          },
          controller: 'HealthNodesCtrl',
          controllerAs: 'healthNodesVM'
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
    clusterIndices.$inject = ['elastic'];
    clusterNodes.$inject = ['elastic'];

    function clusterStatus(elastic) {
      return elastic.health().then(function(response) {
        return response.data;
      });
    }

    function clusterIndices(elastic) {
      return elastic.indicesHealth().then(function(response) {
        return response.data.indices;
      });
    }

    function clusterNodes(elastic) {
      return elastic.nodesInfo().then(function(response) {
        return response.data.nodes;
      });
    }
  }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('elastic', elastic);

  elastic.$inject = ['$http'];

  function elastic($http) {
    return {
      health: health,
      indicesHealth: indicesHealth,
      nodesInfo: nodesInfo
    };

    function health() {
      return $http.get('http://localhost:9200/_cluster/health');
    }

    function indicesHealth() {
      return $http.get('http://localhost:9200/_cluster/health?level=indices');
    }

    function nodesInfo() {
      return $http.get('http://localhost:9200/_nodes');
    }
  }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthCtrl', HealthCtrl);

    HealthCtrl.$inject = ['$scope', 'cluster'];

    function HealthCtrl($scope, cluster) {
      var healthVM = this;
      var icons = { green: 'thumb_up', yellow: 'thumbs_up_down', red: 'thumb_down'};
      var colors = { green: 'greenyellow', yellow: 'yellow', red: 'red'};

      // Injection though resolve promise in route
      healthVM.cluster = cluster;
      healthVM.clusterColor = clusterColor;
      healthVM.clusterIcon = clusterIcon;

      function clusterIcon(status) {
        return icons[status];
      }

      function clusterColor(status) {
        return colors[status];
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthIndicesCtrl', HealthIndicesCtrl);

    HealthIndicesCtrl.$inject = ['$scope', 'indices'];

    function HealthIndicesCtrl($scope, indices) {
      var healthIndicesVM = this;
      var icons = { green: 'thumb_up', yellow: 'thumbs_up_down', red: 'thumb_down'};
      var colors = { green: 'greenyellow', yellow: 'yellow', red: 'red'};

      // Injection though resolve promise in route
      healthIndicesVM.indices = indices;
      healthIndicesVM.clusterIcon = clusterIcon;
      healthIndicesVM.clusterColor = clusterColor;
      healthIndicesVM.indiceName = indiceName;

      function clusterIcon(status) {
        return icons[status];
      }

      function clusterColor(status) {
        return colors[status];
      }

      function indiceName(index) {
        return _.keys(healthIndicesVM.indices)[index];
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthNodesCtrl', HealthNodesCtrl);

    HealthNodesCtrl.$inject = ['$scope', 'nodes'];

    function HealthNodesCtrl($scope, nodes) {
      var healthNodesVM = this;

      // Injection though resolve promise in route
      healthNodesVM.nodes = nodes;
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
