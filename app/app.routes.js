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
            abstract: true,
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
          url: '/watchers',
          abstract: true,
          views: {
            'watchers': {
              templateUrl: 'assets/templates/watch.watchers.list.html'
            }
          }
        })
        .state('watch.watchers.list', {
          url: '/list',
          templateUrl: 'assets/templates/watch.watchers.html',
          controller: 'WatchersListCtrl',
          controllerAs: 'watchersListVM',
          resolve: {
            watchersListData: watchersListData
          }
        })
        .state('watch.watchers.create', {
          abstract: true,
          url: '/create',
          templateUrl: 'assets/templates/watch.watchers.create.html',
          controller: 'WatchersCtrl',
          controllerAs: 'watchersVM'
        })
        .state('watch.watchers.create.input', {
          url: '/input',
          templateUrl: 'assets/templates/watchers.input.html',
          resolve: {
            inputsData: inputsData,
            editable: function() { return true; }
          },
          controller: 'WatcherInputCtrl',
          controllerAs: 'watcherInputVM'
        })
        .state('watch.watchers.create.trigger', {
          url: '/trigger',
          templateUrl: 'assets/templates/watchers.trigger.html',
          resolve: {
            triggersData: triggersData,
            editable: function() { return true; }
          },
          controller: 'WatcherTriggerCtrl',
          controllerAs: 'watcherTriggerVM'
        })
        .state('watch.watchers.create.conditions', {
          url: '/conditions',
          templateUrl: 'assets/templates/watchers.conditions.html',
          resolve: {
            conditionsData: conditionsData,
            editable: function() { return true; }
          },
          controller: 'WatcherConditionsCtrl',
          controllerAs: 'watcherConditionsVM'
        })
        .state('watch.watchers.create.actions', {
          url: '/actions',
          templateUrl: 'assets/templates/watchers.actions.html',
          abstract: true,
          resolve: {
            editable: function() { return true; }
          },
          controller: 'WatcherActionsCtrl',
          controllerAs: 'watcherActionsVM'
        })
        .state('watch.watchers.create.actions.list', {
          url: '/all',
          views: {
            'actions': {
              templateUrl: 'assets/templates/watchers.actions.list.html',
              resolve: {
                actionsData: actionsData
              },
              controller: 'WatcherActionsListCtrl',
              controllerAs: 'watcherActionsListVM'
            }
          }
        })
        .state('watch.watchers.create.actions.reload', {
          url: '/reload',
          views: {
            'actions': {
              templateUrl: 'assets/templates/watchers.actions.list.html',
              resolve: {
                actionsData: actionsData
              },
              controller: 'WatcherActionsListCtrl',
              controllerAs: 'watcherActionsListVM'
            }
          }
        })
        .state('watch.watchers.create.summary', {
          url: '/summary',
          templateUrl: 'assets/templates/watchers.summary.html',
          abstract: true,
          resolve: {
            watcherSummary: watcherSummary
          },
          controller: 'WatcherSummaryCtrl',
          controllerAs: 'watcherSummaryVM'
        })
        .state('watch.watchers.create.summary.pretty', {
          url: '/pretty',
          views: {
            'input': {
              templateUrl: 'assets/templates/watchers.input.html',
              resolve: {
                inputsData: inputsData,
                editable: function() { return false; }
              },
              controller: 'WatcherInputCtrl',
              controllerAs: 'watcherInputVM'
            },
            'trigger': {
              templateUrl: 'assets/templates/watchers.trigger.html',
              resolve: {
                triggersData: triggersData,
                editable: function() { return false; }
              },
              controller: 'WatcherTriggerCtrl',
              controllerAs: 'watcherTriggerVM'
            },
            'condition': {
              templateUrl: 'assets/templates/watchers.conditions.html',
              resolve: {
                conditionsData: conditionsData,
                editable: function() { return false; }
              },
              controller: 'WatcherConditionsCtrl',
              controllerAs: 'watcherConditionsVM'
            },
            'action': {
              templateUrl: 'assets/templates/watchers.actions.list.html',
              resolve: {
                actionsData: actionsData,
                editable: function() { return false; }
              },
              controller: 'WatcherActionsListCtrl',
              controllerAs: 'watcherActionsListVM'
            }
          }
        })
        .state('watch.watchers.create.summary.json', {
          url: '/json',
          views: {
            'json': {
              templateUrl: 'assets/templates/watchers.summary.json.html',
              resolve: {
                jsonData: jsonData
              },
              controller: 'WatcherSummaryRawCtrl',
              controllerAs: 'watcherSummaryRawVM'
            }
          }
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
    watchersListData.$inject = ['elastic'];
    inputsData.$inject = ['watchers'];
    triggersData.$inject = ['watchers'];
    actionsData.$inject = ['watchers'];
    conditionsData.$inject = ['watchers'];
    watcherSummary.$inject = ['watchers'];
    jsonData.$inject = ['watchers'];

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

    function watchersListData(elastic) {
      return elastic.watchers()
        .then(function(response) {
          return _.map(response.data.hits.hits, function(w) { return { id: w._id, active: w._source._status.state.active }; });
        });
    }

    function inputsData(watchers) {
      return watchers.getWatchInputs();
    }

    function triggersData(watchers) {
      return watchers.getWatchTriggers();
    }

    function conditionsData(watchers) {
      return watchers.getWatchConditions();
    }

    function actionsData(watchers) {
      return watchers.getWatchActions();
    }

    function watcherSummary(watchers) {
      return watchers.getWatcherSummary();
    }

    function jsonData(watchers) {
      var json = watchers.getWatcherSummary() || {};
      return angular.toJson(angular.fromJson(json), true);
    }
  }
})();
