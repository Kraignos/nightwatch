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

(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('elastic', elastic);

  elastic.$inject = ['$http'];

  function elastic($http) {
    return {
      health: health,
      indicesHealth: indicesHealth
    };

    function health() {
      return $http.get('http://localhost:9200/_cluster/health');
    }

    function indicesHealth() {
      return $http.get('http://localhost:9200/_cluster/health?level=indices');
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

      // Injection though resolve promise in route
      healthVM.cluster = cluster;

      healthVM.clusterIcon = clusterIcon;

      function clusterIcon(status) {
        return icons[status];
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('HealthDetailsCtrl', HealthDetailsCtrl);

    HealthDetailsCtrl.$inject = ['$scope', 'details'];

    function HealthDetailsCtrl($scope, details) {
      var healthDetailsVM = this;
      var icons = { green: 'thumb_up', yellow: 'thumbs_up_down', red: 'thumb_down'};

      // Injection though resolve promise in route
      healthDetailsVM.details = details;
      healthDetailsVM.clusterIcon = clusterIcon;
      healthDetailsVM.indiceName = indiceName;

      angular.forEach(healthDetailsVM.details.indices, function(detail, index) {
        console.log('detail: ' + _.keys(healthDetailsVM.details.indices));
      });

      function clusterIcon(status) {
        return icons[status];
      }

      function indiceName(index) {
        return _.keys(healthDetailsVM.details.indices)[index];
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
