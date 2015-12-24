/*! nightwatch - v1.0.0 - 2015-12-24
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
        .state('watch', {
            url: '/watch',
            abstract: 'true',
            templateUrl: 'assets/templates/watch.html'
        })
        .state('watch.percolators', {
            url: '/percolators',
            views: {
              'percolator': {
                templateUrl: 'assets/templates/watch.percolators.html',
                controller: 'PercolatorsCtrl',
                controllerAs: 'percolatorsVM'
              }
            }
        })
        .state('watch.watchers', {
          abstract: true,
          url: '/watchers',
          views: {
            'watchers': {
              templateUrl: 'assets/templates/watch.watchers.html',
              controller: 'WatchersCtrl',
              controllerAs: 'watchersVM'
            }
          }
        })
        .state('watch.watchers.input', {
          url: '/input',
          templateUrl: 'assets/templates/watchers.input.html',
          resolve: {
            watcherInputs: watcherInputs
          },
          controller: 'WatcherInputCtrl',
          controllerAs: 'watcherInputVM'
        })
        .state('watch.watchers.trigger', {
          url: '/trigger',
          templateUrl: 'assets/templates/watchers.trigger.html',
          controller: 'WatcherTriggerCtrl',
          controllerAs: 'watcherTriggerVM'
        })
        .state('watch.watchers.conditions', {
          url: '/conditions',
          templateUrl: 'assets/templates/watchers.conditions.html',
          controller: 'WatcherConditionsCtrl',
          controllerAs: 'watcherConditionsVM'
        })
        .state('watch.watchers.actions', {
          url: '/actions',
          templateUrl: 'assets/templates/watchers.actions.html',
          controller: 'WatcherActionsCtrl',
          controllerAs: 'watcherActionsVM'
        })
        .state('watch.watchers.summary', {
          url: '/summary',
          templateUrl: 'assets/templates/watchers.summary.html',
          resolve: {
            watcherSummary: watcherSummary
          },
          controller: 'WatcherSummaryCtrl',
          controllerAs: 'watcherSummaryVM'
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
    watcherInputs.$inject = ['watchers'];
    watcherSummary.$inject = ['watchers'];

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

    function watcherInputs(watchers) {
      return watchers.getWatchInputs();
    }

    function watcherSummary(watchers) {
      return watchers.getWatcherSummary();
    }
  }
})();

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

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorCreateCtrl', PercolatorCreateCtrl);

    PercolatorCreateCtrl.$inject = ['$scope', '$mdDialog', 'elastic', 'data', 'notifications'];

    function PercolatorCreateCtrl($scope, $mdDialog, elastic, data, notifications) {
      var percolatorsCreateVM = this;

      percolatorsCreateVM.indice = data.indice;
      percolatorsCreateVM.name = null;
      percolatorsCreateVM.query = null;

      percolatorsCreateVM.createPercolator = createPercolator;
      percolatorsCreateVM.cancelForm = cancelForm;

      function createPercolator() {
        elastic.createPercolator(percolatorsCreateVM.indice, percolatorsCreateVM.name, percolatorsCreateVM.query)
          .success(function() {
            closeForm({ '_id': percolatorsCreateVM.name, '_source': percolatorsCreateVM.query });
            notifications.showSimple('The percolator with name "' + percolatorsCreateVM.name + '" has been created!');
          })
          .error(function() {
            $mdDialog.cancel();
            notifications.showSimple('An error occured while creating the percolator with name "' + percolatorsCreateVM.name + '"...');
          });
      }

      function cancelForm() {
        $mdDialog.cancel();
      }

      function closeForm(percolator) {
        $mdDialog.hide(percolator);
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorMatchCtrl', PercolatorMatchCtrl);

    PercolatorMatchCtrl.$inject = ['$scope', '$mdDialog', 'elastic', 'data'];

    function PercolatorMatchCtrl($scope, $mdDialog, elastic, data) {
      var percolatorMatchVM = this;

      percolatorMatchVM.indice = data.indice;
      percolatorMatchVM.percolator = data.percolator;
      percolatorMatchVM.document = '';
      percolatorMatchVM.mappings = null;
      percolatorMatchVM.mapping = null;

      percolatorMatchVM.loadMappings = loadMappings;
      percolatorMatchVM.cancelForm = cancelForm;

      function loadMappings() {
        return elastic.indiceInfo(percolatorMatchVM.indice).then(function(response) {
          percolatorMatchVM.mappings = _.filter(_.keys(response.data[percolatorMatchVM.indice].mappings), function(m) {
            return m !== '.percolator'
          });
        });
      }

      function cancelForm() {
        $mdDialog.cancel();
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorsCtrl', PercolatorsCtrl);

    PercolatorsCtrl.$inject = ['$scope', '$mdDialog', 'elastic', 'notifications'];

    function PercolatorsCtrl($scope, $mdDialog, elastic, notifications) {
      var percolatorsVM = this;

      percolatorsVM.indices = null;
      percolatorsVM.indice = null;
      percolatorsVM.percolators = null;
      percolatorsVM.percolator = null;
      percolatorsVM.displayPercolators = displayPercolators;
      percolatorsVM.loadIndices = loadIndices;
      percolatorsVM.loadPercolators = loadPercolators;
      percolatorsVM.deletePercolator = deletePercolator;
      percolatorsVM.displayForm = displayForm;
      percolatorsVM.cancelForm = cancelForm;
      percolatorsVM.matchPercolator = matchPercolator;

      function loadIndices() {
        return elastic.indicesHealth().then(function(response) {
          percolatorsVM.indices = _.keys(response.data.indices);
        });
      }

      function loadPercolators() {
        return elastic.percolators(percolatorsVM.indice).then(function(response) {
          percolatorsVM.percolators = response.data.hits.hits;
        });
      }

      function displayPercolators() {
        return !_.isNull(percolatorsVM.percolators) && percolatorsVM.percolators.length > 0;
      }

      function deletePercolator(event, p, index) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete this percolator?')
              .textContent('The percolator named "' + p + '" will be deleted definitively.')
              .ariaLabel('Delete the percolator')
              .targetEvent(event)
              .ok('Yes, delete it')
              .cancel('No, don\'t do it');
        $mdDialog.show(confirm).then(function() {
          elastic.deletePercolator(percolatorsVM.indice, p)
            .success(function() {
              notifications.showSimple('The percolator with name "' + p + '" has been deleted!');
              percolatorsVM.percolators.splice(index, 1);
            })
            .error(function() {
              notifications.showSimple('An error occured while deleting the percolator with name "' + p + '"...');
            })
        });
      }

      function displayForm(event, indice) {
        $mdDialog.show({
          controller: 'PercolatorCreateCtrl',
          controllerAs: 'percolatorsCreateVM',
          templateUrl: 'assets/templates/percolator.dialog.html',
          parent: angular.element(document.body),
          targetEvent: event,
          resolve: {
            data: function() {
              return { indice: percolatorsVM.indice };
            }
          }
        }).then(function(percolator) {
          percolatorsVM.percolators.push(percolator);
        });
      }

      function cancelForm() {
        $mdDialog.cancel();
      }

      function matchPercolator(event, indice, percolator) {
        $mdDialog.show({
          controller: 'PercolatorMatchCtrl',
          controllerAs: 'percolatorMatchVM',
          templateUrl: 'assets/templates/percolator.match.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          resolve: {
            data: function() {
              return { indice: percolatorsVM.indice, percolator: percolator };
            }
          }
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
      indiceInfo: indiceInfo,
      nodesInfo: nodesInfo,
      percolators: percolators,
      deletePercolator: deletePercolator,
      createPercolator: createPercolator
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

    function percolators(indice) {
      return $http.get('http://localhost:9200/' + indice + '/.percolator/_search');
    }

    function deletePercolator(indice, p) {
      return $http.delete('http://localhost:9200/' + indice + '/.percolator/' + p);
    }

    function createPercolator(indice, name, query) {
      return $http.put('http://localhost:9200/' + indice + '/.percolator/' + name, query);
    }

    function indiceInfo(indice) {
      return $http.get('http://localhost:9200/' + indice);
    }
  }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('notifications', notifications);

  notifications.$inject = ['$mdToast'];

  function notifications($mdToast) {
    return {
      showSimple: showSimple
    };

    function showSimple(message) {
      return $mdToast.show($mdToast.simple()
        .textContent(message)
        .position('top right')
        .hideDelay(3000));
    }
  }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('watchers', watchers);

  watchers.$inject = ['WatchInputType', 'SimpleInputType', 'SearchInputType', 'ExpandWildCards', 'ResponseContentType', 'ScheduleTriggerTypes'];

  function watchers(WatchInputType, SimpleInputType, SearchInputType, ExpandWildCards, ResponseContentType, ScheduleTriggerTypes) {
    var inputs = {};
    var trigger = {};

    var service = {
      getInputTypes: getInputTypes,
      setSimpleWatcherInput: setSimpleWatcherInput,
      setSearchWatcherInput: setSearchWatcherInput,
      setHttpWatcherInput: setHttpWatcherInput,
      setWatcherScheduleTrigger: setWatcherScheduleTrigger,
      getWatchInputs: getWatchInputs,
      getWatcherSummary: getWatcherSummary,
      getSimpleInputTypes: getSimpleInputTypes,
      getSearchRequestTypes: getSearchRequestTypes,
      getExpandWildCards: getExpandWildCards,
      getResponseContentTypes: getResponseContentTypes,
      getScheduleTriggerTypes: getScheduleTriggerTypes,
      transformToArray: transformToArray
    }

    return service;

    function setSimpleWatcherInput(input) {
      inputs[WatchInputType.SIMPLE] = input;
    }

    function setSearchWatcherInput(search) {
      inputs[WatchInputType.SEARCH] = search;
    }

    function setHttpWatcherInput(http) {
      inputs[WatchInputType.HTTP] = http;
    }

    function setWatcherScheduleTrigger(schedule) {
      // Only schedule trigger is availale in ES so far
      trigger = schedule;
    }

    function getWatchInputs() {
      return inputs;
    }

    function getInputTypes() {
      return [WatchInputType.SIMPLE, WatchInputType.SEARCH, WatchInputType.HTTP];
    }

    function getWatcherSummary() {
      var summary = {};
      summary['input'] = inputs;
      summary['trigger'] = trigger;
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

    function getResponseContentTypes() {
      return [
        ResponseContentType.JSON,
        ResponseContentType.YAML,
        ResponseContentType.TEXT
      ];
    }

    function getScheduleTriggerTypes() {
      return [
        ScheduleTriggerTypes.HOURLY,
        ScheduleTriggerTypes.DAILY,
        ScheduleTriggerTypes.WEEKLY,
        ScheduleTriggerTypes.MONTHLY,
        ScheduleTriggerTypes.YEARLY,
        ScheduleTriggerTypes.CRON,
        ScheduleTriggerTypes.INTERVAL
      ];
    }

    function transformToArray(values) {
      return _.map(values.trim().split(','), function(v) {
        return v.trim();
      });
    }
  }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCtrl', WatcherActionsCtrl);

    WatcherActionsCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherActionsCtrl($scope, $state, watchers) {
      var watcherActionsVM = this;

      watcherActionsVM.goToConditions = goToConditions;
      watcherActionsVM.goToSummary = goToSummary;

      function goToConditions() {
        $state.go('watch.watchers.conditions');
      }

      function goToSummary() {
        $state.go('watch.watchers.summary');
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherConditionsCtrl', WatcherConditionsCtrl);

    WatcherConditionsCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherConditionsCtrl($scope, $state, watchers) {
      var watcherConditionsVM = this;

      watcherConditionsVM.goToTrigger = goToTrigger;
      watcherConditionsVM.goToActions = goToActions;

      function goToTrigger() {
        $state.go('watch.watchers.trigger');
      }

      function goToActions() {
        $state.go('watch.watchers.actions');
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatchersCtrl', WatchersCtrl);

    WatchersCtrl.$inject = ['$scope', 'watchers'];

    function WatchersCtrl($scope, watchers) {
      var watchersVM = this;
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherInputCtrl', WatcherInputCtrl);

    WatcherInputCtrl.$inject = ['$scope', '$state', 'watchers', 'notifications', 'watcherInputs'];

    function WatcherInputCtrl($scope, $state, watchers, notifications, watcherInputs) {
      var watcherInputVM = this;

      watcherInputVM.input = {};
      watcherInputVM.type = '';
      watcherInputVM.request = {};

      watcherInputVM.goToTrigger = goToTrigger;
      watcherInputVM.getPrettyInput = getPrettyInput;
      watcherInputVM.hasInput = hasInput;

      watcherInputVM.getSearchRequestTypes = getSearchRequestTypes;
      watcherInputVM.getTypes = getTypes;
      watcherInputVM.getSimpleTypes = getSimpleTypes;
      watcherInputVM.getExpandWildCards = getExpandWildCards;
      watcherInputVM.getResponseTypes = getResponseTypes;

      watcherInputVM.addSimpleInputType = addSimpleInputType;
      watcherInputVM.addSearchInputType = addSearchInputType;
      watcherInputVM.addHttpInputType = addHttpInputType;


      function goToTrigger() {
        $state.go('watch.watchers.trigger');
      }

      function getSearchRequestTypes() {
        return watchers.getSearchRequestTypes();
      }

      function getTypes() {
        return watchers.getInputTypes();
      }

      function getSimpleTypes() {
        return watchers.getSimpleInputTypes();
      }

      function addSimpleInputType(nature, value) {
        var simple = watcherInputVM.input['simple'] || {};
        simple[nature] = nature === 'obj' ? angular.fromJson(value) : value;
        watcherInputVM.input['simple'] = simple;
        watchers.setSimpleWatcherInput(watcherInputVM.input);
        notifications.showSimple('The simple input type has been saved');
      }

      function getPrettyInput() {
        return angular.toJson(watcherInputVM.input, true);
      }

      function hasInput() {
        return _.size(watcherInputVM.input) > 0;
      }

      function getExpandWildCards() {
        return watchers.getExpandWildCards();
      }

      function getResponseTypes() {
        return watchers.getResponseContentTypes();
      }

      function addSearchInputType(search, extract, timeout) {
        var request = search || {};
        var watcherInput = {};

        if (_.contains(_.keys(request), 'indices')) {
          request.indices = transformToArray(request.indices);
        }
        if (_.contains(_.keys(request), 'types')) {
          request.types = transformToArray(request.types);
        }
        if (_.contains(_.keys(request), 'body')) {
          request.body = angular.fromJson(request.body);
        }
        if (_.contains(_.keys(request), 'template')) {
          request.template = angular.fromJson(request.template);
        }

        watcherInputVM.input['search'] = {
          request: request
        };

        if (!_.isUndefined(extract)) {
          watcherInputVM.input['search']['extract'] = extract;
        }

        if (!_.isUndefined(timeout)) {
          watcherInputVM.input['search']['timeout'] = timeout;
        }

        watchers.setSearchWatcherInput(watcherInputVM.input.search);
        notifications.showSimple('The search input type has been saved');
      }

      function addHttpInputType(http, extract, responseContentType) {
        var request = http || {};
        var watcherInput = {};

        watcherInputVM.input['http'] = {
          request: request
        };

        if (!_.isUndefined(extract)) {
          watcherInputVM.input['http']['extract'] = extract;
        }

        if (!_.isUndefined(responseContentType)) {
          watcherInputVM.input['http']['responseContentType'] = responseContentType;
        }

        watchers.setHttpWatcherInput(watcherInputVM.input.http);
        notifications.showSimple('The HTTP input type has been saved');
      }

      function transformToArray(values) {
        return _.map(values.trim().split(','), function(v) {
          return v.trim();
        });
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryCtrl', WatcherSummaryCtrl);

    WatcherSummaryCtrl.$inject = ['$scope', '$state', 'watchers', 'watcherSummary'];

    function WatcherSummaryCtrl($scope, $state, watchers, watcherSummary) {
      var watcherSummaryVM = this;

      watcherSummaryVM.summary = watcherSummary;
      watcherSummaryVM.goToActions = goToActions;
      watcherSummaryVM.saveWatcher = saveWatcher;

      function goToActions() {
        $state.go('watch.watchers.actions');
      }

      function saveWatcher() {
        console.log('summary: ' + angular.toJson(watcherSummaryVM.summary));
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherTriggerCtrl', WatcherTriggerCtrl);

    WatcherTriggerCtrl.$inject = ['$scope', '$state', 'watchers'];

    function WatcherTriggerCtrl($scope, $state, watchers) {
      var watcherTriggerVM = this;

      watcherTriggerVM.type = '';
      watcherTriggerVM.schedule = {};

      watcherTriggerVM.goToInput = goToInput;
      watcherTriggerVM.goToConditions = goToConditions;
      watcherTriggerVM.saveTrigger = saveTrigger;

      watcherTriggerVM.getTriggerTypes = getTriggerTypes;

      function goToInput() {
        $state.go('watch.watchers.input');
      }

      function goToConditions() {
        watcherTriggerVM.saveTrigger();
        $state.go('watch.watchers.conditions');
      }

      function saveTrigger() {
        console.log('before: ' + watcherTriggerVM.schedule.hourly);
        if (!_.isUndefined(watcherTriggerVM.schedule.hourly)) {
          console.log('after: ' + watchers.transformToArray(watcherTriggerVM.schedule.hourly));
          watcherTriggerVM.schedule.hourly = { minute: watchers.transformToArray(watcherTriggerVM.schedule.hourly) };
        }
        watchers.setWatcherScheduleTrigger(watcherTriggerVM.schedule);
      }

      function hasTrigger() {
        return _.size(watcherTriggerVM.schedule) > 0;
      }

      function getTriggerTypes() {
        return watchers.getScheduleTriggerTypes();
      }
    }
})();
