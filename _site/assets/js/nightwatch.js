/*! nightwatch - v1.0.0 - 2016-01-10
* Copyright (c) 2016 ; Licensed  */
(function() {
  'use strict';

  angular.module('nightwatch', ['ngSanitize', 'ngMaterial', 'ui.router']);
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
            },
            'json': {
              templateUrl: 'assets/templates/watchers.summary.json.html',
              resolve: {
                jsonData: jsonData
              },
              controller: 'WatcherSummaryRawCtrl',
              controllerAs: 'watcherSummaryRawVM'
            }
          }
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
      return elastic.health()
        .then(function(response) {
          return response.data;
        }, function(error) {
          return {};
        });
    }

    function clusterIndices(elastic) {
      return elastic.indicesHealth()
        .then(function(response) {
          return response.data.indices;
        }, function(error) {
          return {};
        });
    }

    function clusterNodes(elastic) {
      return elastic.nodesInfo()
        .then(function(response) {
          return response.data.nodes;
        }, function(error) {
          return {};
        });
    }

    function watchersListData(elastic) {
      return elastic.watchers()
        .then(function(response) {
          return _.map(response.data.hits.hits, function(w) { return { id: w._id, active: w._source._status.state.active }; });
        }, function(error) {
          return {};
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
    })
    .constant('ActionTypes', {
      EMAIL: 'email',
      WEBHOOK: 'webhook',
      INDEX: 'index',
      LOGGING: 'logging',
      HIPCHAT: 'hipchat',
      SLACK: 'slack'
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

(function () {
    'use strict';

    angular.module('nightwatch')
        .directive('ngEnter', ngEnter);

    function ngEnter() {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
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
      percolatorsVM.displayJson = displayJson;
      percolatorsVM.displayForm = displayForm;
      percolatorsVM.cancelForm = cancelForm;
      percolatorsVM.matchPercolator = matchPercolator;
      percolatorsVM.getSummary = getSummary;

      function loadIndices() {
        return elastic.indicesHealth().then(function(response) {
          percolatorsVM.indices = _.filter(_.keys(response.data.indices), function(indice) { return indice.substring(0, 1) !== '.'; });
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
            });
        });
      }

      function displayJson(event, json) {
        $mdDialog.show({
          controller: 'PercolatorDetailsCtrl',
          controllerAs: 'percolatorsDetailsVM',
          templateUrl: 'assets/templates/percolator.json.dialog.html',
          parent: angular.element(document.body),
          resolve: {
            percolatorJsonData: function() { return angular.toJson(angular.fromJson(json), true); }
          },
          targetEvent: event
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

      function getSummary(source) {
        return source.length > 150 ? source.substring(0, 150) + '...' : source;
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
        if (!_.isEmpty(percolatorsCreateVM.name) && !_.isEmpty(percolatorsCreateVM.query)) {
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
    .controller('PercolatorDetailsCtrl', PercolatorDetailsCtrl);

    PercolatorDetailsCtrl.$inject = ['$scope', '$mdDialog', 'percolatorJsonData'];

    function PercolatorDetailsCtrl($scope, $mdDialog, percolatorJsonData) {
      var percolatorsDetailsVM = this;

      percolatorsDetailsVM.json = percolatorJsonData;
      percolatorsDetailsVM.cancelForm = cancelForm;
      percolatorsDetailsVM.close = close;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function close() {
        $mdDialog.hide();
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
      createPercolator: createPercolator,
      createWatcher: createWatcher,
      getWatcher: getWatcher,
      watchers: watchers
    };

    function health() {
      return $http.get('/_cluster/health');
    }

    function indicesHealth() {
      return $http.get('/_cluster/health?level=indices');
    }

    function nodesInfo() {
      return $http.get('/_nodes');
    }

    function percolators(indice) {
      return $http.get('/' + indice + '/.percolator/_search');
    }

    function deletePercolator(indice, p) {
      return $http.delete('/' + indice + '/.percolator/' + p);
    }

    function createPercolator(indice, name, query) {
      return $http.put('/' + indice + '/.percolator/' + name, query);
    }

    function indiceInfo(indice) {
      return $http.get('/' + indice);
    }

    function createWatcher(name, definition) {
      return $http.put('/_watcher/watch/' + name, definition);
    }

    function getWatcher(name) {
      return $http.get('/_watcher/watch/' + name);
    }

    function watchers() {
      return $http.get('/.watches/_search');
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

  watchers.$inject = ['WatchInputType', 'SimpleInputType', 'SearchInputType', 'ExpandWildCards', 'ResponseContentType', 'ScheduleTriggerTypes', 'ConditionTypes', 'ScriptConditionTypes', 'ScriptLanguages', 'ComparisonOperators', 'ActionTypes'];

  function watchers(WatchInputType, SimpleInputType, SearchInputType, ExpandWildCards, ResponseContentType, ScheduleTriggerTypes, ConditionTypes, ScriptConditionTypes, ScriptLanguages, ComparisonOperators, ActionTypes) {
    var inputs = {};
    var triggers = {};
    var conditions = {};
    var actions = {};

    var service = {
      getInputTypes: getInputTypes,
      setSimpleWatcherInput: setSimpleWatcherInput,
      setSearchWatcherInput: setSearchWatcherInput,
      setHttpWatcherInput: setHttpWatcherInput,
      setWatcherInput: setWatcherInput,
      setWatcherScheduleTrigger: setWatcherScheduleTrigger,
      setWatcherCondition: setWatcherCondition,
      addWatcherAction: addWatcherAction,
      getWatchInputs: getWatchInputs,
      getWatchTriggers: getWatchTriggers,
      getWatchConditions: getWatchConditions,
      getWatchActions: getWatchActions,
      getWatcherAction: getWatcherAction,
      getWatcherSummary: getWatcherSummary,
      getSimpleInputTypes: getSimpleInputTypes,
      getSearchRequestTypes: getSearchRequestTypes,
      getExpandWildCards: getExpandWildCards,
      getResponseContentTypes: getResponseContentTypes,
      getScheduleTriggerTypes: getScheduleTriggerTypes,
      getConditionTypes: getConditionTypes,
      getScriptTypes: getScriptTypes,
      getScriptLanguages: getScriptLanguages,
      getComparisonOperators: getComparisonOperators,
      getActionTypes: getActionTypes,
      deleteAction: deleteAction,
      loadWatcher: loadWatcher,
      resetWatcher: resetWatcher,
      getControllerForWatcherType: getControllerForWatcherType,
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

    function setWatcherInput(input) {
      inputs = input;
    }

    function setWatcherScheduleTrigger(trigger) {
      // Only schedule trigger is availale in ES so far
      triggers['schedule'] = trigger;
    }

    function setWatcherCondition(condition) {
      conditions = condition;
    }

    function addWatcherAction(name, action) {
      actions[name] = action;
    }

    function getWatchInputs() {
      return inputs;
    }

    function getWatchTriggers() {
      return triggers;
    }

    function getWatchConditions() {
      return conditions;
    }

    function getWatchActions() {
      var watcherActions = _.map(_.keys(actions), function(a) {
        return { name: a, type: _.keys(actions[a])[0], action: actions[a] };
      });
      return watcherActions;
    }

    function getWatcherAction(actionName) {
      return actions[actionName];
    }

    function getInputTypes() {
      return [WatchInputType.SIMPLE, WatchInputType.SEARCH, WatchInputType.HTTP];
    }

    function getWatcherSummary() {
      var summary = {};
      summary['input'] = inputs;
      summary['trigger'] = triggers;
      summary['condition'] = conditions;
      summary['actions'] = actions;
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

    function getConditionTypes() {
      return [
        ConditionTypes.ALWAYS,
        ConditionTypes.NEVER,
        ConditionTypes.SCRIPT,
        ConditionTypes.COMPARE,
        ConditionTypes.ARRAY_COMPARE
      ];
    }

    function getScriptTypes() {
      return [
        ScriptConditionTypes.INLINE,
        ScriptConditionTypes.INDEXED,
        ScriptConditionTypes.FILE
      ];
    }

    function getScriptLanguages() {
      return [
        ScriptLanguages.GROOVY,
        ScriptLanguages.JAVASCRIPT,
        ScriptLanguages.PYTHON,
        ScriptLanguages.EXPRESSION,
        ScriptLanguages.MUSTACHE
      ];
    }

    function getComparisonOperators() {
      return [
        ComparisonOperators.EQ,
        ComparisonOperators.NOT_EQ,
        ComparisonOperators.GT,
        ComparisonOperators.GTE,
        ComparisonOperators.LT,
        ComparisonOperators.LTE
      ];
    }

    function getActionTypes() {
      return [
        ActionTypes.EMAIL,
        ActionTypes.WEBHOOK,
        ActionTypes.INDEX,
        ActionTypes.LOGGING,
        ActionTypes.HIPCHAT,
        ActionTypes.SLACK
      ];
    }

    function deleteAction(action) {
      var currentActions = _.keys(actions);
      for (var i =0; i < currentActions.length; i++) {
        if (actions[currentActions[i]] === action) {
          actions.splice(i, 1);
        }
      }
      return getWatchConditions();
    }

    function loadWatcher(watcher) {
      inputs = watcher.watch.input || {};
      triggers = watcher.watch.trigger || {};
      conditions = watcher.watch.condition || {};
      actions = watcher.watch.actions || {};
    }

    function resetWatcher() {
      inputs = {};
      triggers = {};
      conditions = {};
      actions = {};
    }

    function getControllerForWatcherType(type) {
      var controllers = {
          email: {
            controller: 'WatcherActionsEmailCtrl',
            controllerAs: 'watcherActionsEmailVM',
            templateUrl: 'assets/templates/actions/watchers.actions.email.html'
          },
          webhook: {
            controller: 'WatcherActionsWebhookCtrl',
            controllerAs: 'watcherActionsWebhookVM',
            templateUrl: 'assets/templates/actions/watchers.actions.webhook.html'
          },
          index: {
            controller: 'WatcherActionsIndexCtrl',
            controllerAs: 'watcherActionsIndexVM',
            templateUrl: 'assets/templates/actions/watchers.actions.index.html'
          },
          logging: {
            controller: 'WatcherActionsLoggingCtrl',
            controllerAs: 'watcherActionsLoggingVM',
            templateUrl: 'assets/templates/actions/watchers.actions.logging.html'
          },
          hipchat: {
            controller: 'WatcherActionsHipChatCtrl',
            controllerAs: 'watcherActionsHipChatVM',
            templateUrl: 'assets/templates/actions/watchers.actions.hipchat.html'
          },
          slack: {
            controller: 'WatcherActionsSlackCtrl',
            controllerAs: 'watcherActionsSlackVM',
            templateUrl: 'assets/templates/actions/watchers.actions.slack.html'
          }
        };
        return controllers[type];
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
    .controller('WatcherActionsEmailCtrl', WatcherActionsEmailCtrl);

    WatcherActionsEmailCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsEmailCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsEmailVM = this;

      watcherActionsEmailVM.name = data.name;
      watcherActionsEmailVM.email = data.action.email || {};
      watcherActionsEmailVM.cancelForm = cancelForm;
      watcherActionsEmailVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ email: watcherActionsEmailVM.email });
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsHipChatCtrl', WatcherActionsHipChatCtrl);

    WatcherActionsHipChatCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsHipChatCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsHipChatVM = this;

      watcherActionsHipChatVM.name = data.name;
      watcherActionsHipChatVM.hipchat = data.action.hipchat || {};
      watcherActionsHipChatVM.rooms = [];
      watcherActionsHipChatVM.cancelForm = cancelForm;
      watcherActionsHipChatVM.updateAction = updateAction;

      loadRooms();

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        if (!_.isEmpty(watcherActionsHipChatVM.rooms)) {
          watcherActionsHipChatVM.hipchat.message.room = watcherActionsHipChatVM.rooms;
        }
        $mdDialog.hide({ hipchat: watcherActionsHipChatVM.hipchat });
      }

      function loadRooms() {
        if (!_.isUndefined(watcherActionsHipChatVM.hipchat.message) && !_.isUndefined(watcherActionsHipChatVM.hipchat.message.room)) {
          watcherActionsHipChatVM.rooms = watcherActionsHipChatVM.hipchat.message.room;
        }
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsIndexCtrl', WatcherActionsIndexCtrl);

    WatcherActionsIndexCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsIndexCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsIndexVM = this;

      watcherActionsIndexVM.name = data.name;
      watcherActionsIndexVM.index = data.action.index || {};
      watcherActionsIndexVM.cancelForm = cancelForm;
      watcherActionsIndexVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ index: watcherActionsIndexVM.index });
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsLoggingCtrl', WatcherActionsLoggingCtrl);

    WatcherActionsLoggingCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsLoggingCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsLoggingVM = this;

      watcherActionsLoggingVM.name = data.name;
      watcherActionsLoggingVM.logging = data.action.logging || {};
      watcherActionsLoggingVM.cancelForm = cancelForm;
      watcherActionsLoggingVM.updateAction = updateAction;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ logging: watcherActionsLoggingVM.logging });
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsSlackCtrl', WatcherActionsSlackCtrl);

    WatcherActionsSlackCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsSlackCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsSlackVM = this;

      watcherActionsSlackVM.name = data.name;
      watcherActionsSlackVM.slack = data.action.slack || {};
      watcherActionsSlackVM.to = [];
      watcherActionsSlackVM.cancelForm = cancelForm;
      watcherActionsSlackVM.updateAction = updateAction;

      loadChannels();

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        if (!_.isEmpty(watcherActionsSlackVM.to)) {
          watcherActionsSlackVM.slack.message.to = watcherActionsSlackVM.to;
        }
        $mdDialog.hide({ slack: watcherActionsSlackVM.slack });
      }

      function loadChannels() {
        if (!_.isUndefined(watcherActionsSlackVM.slack.message) && !_.isUndefined(watcherActionsSlackVM.slack.message.to)) {
          watcherActionsSlackVM.to = watcherActionsSlackVM.slack.message.to;
        }
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsWebhookCtrl', WatcherActionsWebhookCtrl);

    WatcherActionsWebhookCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'data'];

    function WatcherActionsWebhookCtrl($scope, $state, $mdDialog, watchers, data) {
      var watcherActionsWebhookVM = this;

      watcherActionsWebhookVM.name = data.name;
      watcherActionsWebhookVM.webhook = data.action.webhook || {};
      watcherActionsWebhookVM.cancelForm = cancelForm;
      watcherActionsWebhookVM.updateAction = updateAction;

      watcherActionsWebhookVM.addHeader = addHeader;
      watcherActionsWebhookVM.removeHeader = removeHeader;
      watcherActionsWebhookVM.getHeaders = getHeaders;
      watcherActionsWebhookVM.addParameter = addParameter;
      watcherActionsWebhookVM.removeParameter = removeParameter;
      watcherActionsWebhookVM.getParameters = getParameters;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function updateAction() {
        $mdDialog.hide({ webhook: watcherActionsWebhookVM.webhook });
      }

      function addHeader(name, value) {
        if (!_.isEmpty(name) && !_.isEmpty(value)) {
          var headers = watcherActionsWebhookVM.webhook.headers || {};
          headers[name] = value;
          watcherActionsWebhookVM.webhook.headers = headers;
        }
      }

      function removeHeader(name) {
        var headers = {};
        angular.forEach(_.keys(watcherActionsWebhookVM.webhook.headers), function(p) {
          if (p !== name) {
            headers[p] = watcherActionsWebhookVM.webhook.headers[p];
          }
        });
        watcherActionsWebhookVM.webhook.headers = headers;
      }

      function getHeaders() {
        return _.keys(watcherActionsWebhookVM.webhook.headers);
      }

      function addParameter(name, value) {
        if (!_.isEmpty(name) && !_.isEmpty(value)) {
          var parameters = watcherActionsWebhookVM.webhook.params || {};
          parameters[name] = value;
          watcherActionsWebhookVM.webhook.params = parameters;
        }
      }

      function removeParameter(name) {
        var parameters = {};
        angular.forEach(_.keys(watcherActionsWebhookVM.webhook.params), function(p) {
          if (p !== name) {
            parameters[p] = watcherActionsWebhookVM.webhook.params[p];
          }
        });
        watcherActionsWebhookVM.webhook.params = parameters;
      }

      function getParameters() {
        return _.keys(watcherActionsWebhookVM.webhook.params);
      }
    }
})();

(function () {
    'use strict';

    angular.module('nightwatch')
        .filter('prettify', prettify);

    function prettify() {
        return function (json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        };
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCtrl', WatcherActionsCtrl);

    WatcherActionsCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers'];

    function WatcherActionsCtrl($scope, $state, $mdDialog, watchers) {
      var watcherActionsVM = this;

      watcherActionsVM.name = '';
      watcherActionsVM.type = '';

      watcherActionsVM.goToConditions = goToConditions;
      watcherActionsVM.goToSummary = goToSummary;
      watcherActionsVM.displayCreateForm = displayCreateForm;

      watcherActionsVM.getWatcherActions = getWatcherActions;
      watcherActionsVM.getActionTypes = getActionTypes;

      function goToConditions() {
        $state.go('watch.watchers.create.conditions');
      }

      function goToSummary() {
        $state.go('watch.watchers.create.summary.pretty');
      }

      function displayCreateForm($event) {
        var info = getController(watcherActionsVM.type);
        $mdDialog.show({
          controller: info.controller,
          controllerAs: info.controllerAs,
          templateUrl: info.templateUrl,
          parent: angular.element(document.body),
          targetEvent: event,
          resolve: {
            data: function() {
              return {
                name: watcherActionsVM.name,
                action: {}
              }
            }
          }
        }).then(function(action) {
          watchers.addWatcherAction(watcherActionsVM.name, action);
          $state.go('watch.watchers.create.actions.reload');
        }, function() {
          $state.go('watch.watchers.create.actions.reload');
        });
      }

      function getWatcherActions() {
        return watchers.getWatchActions();
      }

      function getActionTypes() {
        return watchers.getActionTypes();
      }

      function getController(type) {
        return watchers.getControllerForWatcherType(type);
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsCreateCtrl', WatcherActionsCreateCtrl);

    WatcherActionsCreateCtrl.$inject = ['$scope', '$state', 'watchers', 'data'];

    function WatcherActionsCreateCtrl($scope, $state, watchers, data) {
      var watcherActionsCreateVM = this;

      watcherActionsCreateVM.name = data.name
      watcherActionsCreateVM.type = data.type;
      watcherActionsCreateVM[data.type] = {};

      watcherActionsCreateVM.saveAction = saveAction;
      watcherActionsCreateVM.addHeader = addHeader;
      watcherActionsCreateVM.removeHeader = removeHeader;
      watcherActionsCreateVM.getHeaders = getHeaders;
      watcherActionsCreateVM.addParameter = addParameter;
      watcherActionsCreateVM.removeParameter = removeParameter;
      watcherActionsCreateVM.getParameters = getParameters;

      function saveAction() {
        var action = {};
        action[data.type] = watcherActionsCreateVM[data.type];
        watchers.addWatcherAction(watcherActionsCreateVM.name, action);

        $state.go('watch.watchers.create.actions.list');
      }

      function addHeader(name, value) {
        if (!_.isEmpty(name) && !_.isEmpty(value)) {
          var headers = watcherActionsCreateVM[data.type].headers || {};
          headers[name] = value;
          watcherActionsCreateVM[data.type].headers = headers;
        }
      }

      function removeHeader(name) {
        var headers = {};
        angular.forEach(_.keys(watcherActionsCreateVM[data.type].headers), function(p) {
          if (p !== name) {
            headers[p] = watcherActionsCreateVM[data.type].headers[p];
          }
        });
        watcherActionsCreateVM[data.type].headers = headers;
      }

      function getHeaders() {
        return _.keys(watcherActionsCreateVM[data.type].headers);
      }

      function addParameter(name, value) {
        if (!_.isEmpty(name) && !_.isEmpty(value)) {
          var parameters = watcherActionsCreateVM[data.type].params || {};
          parameters[name] = value;
          watcherActionsCreateVM[data.type].params = parameters;
        }
      }

      function removeParameter(name) {
        var parameters = {};
        angular.forEach(_.keys(watcherActionsCreateVM[data.type].params), function(p) {
          if (p !== name) {
            parameters[p] = watcherActionsCreateVM[data.type].params[p];
          }
        });
        watcherActionsCreateVM[data.type].params = parameters;
      }

      function getParameters() {
        return _.keys(watcherActionsCreateVM[data.type].params);
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherActionsListCtrl', WatcherActionsListCtrl);

    WatcherActionsListCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'notifications', 'actionsData', 'editable'];

    function WatcherActionsListCtrl($scope, $state, $mdDialog, watchers, notifications, actionsData, editable) {
      var watcherActionsListVM = this;
      var icons = { email: 'mail' };
      
      watcherActionsListVM.actions = actionsData || {};
      watcherActionsListVM.hasActions = hasActions;
      watcherActionsListVM.actionIcon = actionIcon;
      watcherActionsListVM.showAction = showAction;
      watcherActionsListVM.deleteAction = deleteAction;
      watcherActionsListVM.canBeEdit = editable;

      function hasActions() {
        return !_.isEmpty(watcherActionsListVM.actions);
      }

      function actionIcon(type) {
        return icons[type];
      }

      function showAction(event, name, type) {
        var info = getController(type);
        $mdDialog.show({
          controller: info.controller,
          controllerAs: info.controllerAs,
          templateUrl: info.templateUrl,
          parent: angular.element(document.body),
          targetEvent: event,
          resolve: {
            data: function() {
              return {
                name: name,
                action: watchers.getWatcherAction(name)
              }
            }
          }
        }).then(function(action) {
          watchers.addWatcherAction(name, action);
        });
      }

      function deleteAction(event, name) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete this action?')
              .textContent('The action named "' + name + '" will be deleted definitively.')
              .ariaLabel('Delete the action')
              .targetEvent(event)
              .ok('Yes, delete it')
              .cancel('No, don\'t do it');
        $mdDialog.show(confirm).then(function() {
          watcherActionsListVM.actions = watchers.deleteAction(name);
          notifications.showSimple('The action with name "' + name + '" has been deleted!');
        });
      }

      function getController(type) {
        return watchers.getControllerForWatcherType(type);
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherConditionsCtrl', WatcherConditionsCtrl);

    WatcherConditionsCtrl.$inject = ['$scope', '$state', 'ConditionTypes', 'ComparisonOperators', 'watchers', 'conditionsData', 'editable'];

    function WatcherConditionsCtrl($scope, $state, ConditionTypes, ComparisonOperators, watchers, conditionsData, editable) {
      var watcherConditionsVM = this;

      watcherConditionsVM.type = (_.keys(conditionsData)[0]) || '';
      watcherConditionsVM.scriptType = '';
      watcherConditionsVM.condition = {};
      watcherConditionsVM.leftOperand = '';
      watcherConditionsVM.rightOperand = '';
      watcherConditionsVM.rightOperandName = '';
      watcherConditionsVM.operator = '';
      watcherConditionsVM.quantifier = null;
      watcherConditionsVM.path = null;

      watcherConditionsVM.goToTrigger = goToTrigger;
      watcherConditionsVM.goToActions = goToActions;

      watcherConditionsVM.getConditionTypes = getConditionTypes;
      watcherConditionsVM.getScriptTypes = getScriptTypes;
      watcherConditionsVM.getScriptLanguages = getScriptLanguages;
      watcherConditionsVM.updateType = updateType;
      watcherConditionsVM.updateScriptType = updateScriptType;
      watcherConditionsVM.addParameter = addParameter;
      watcherConditionsVM.removeParameter = removeParameter;
      watcherConditionsVM.getParameters = getParameters;
      watcherConditionsVM.getComparisonOperators = getComparisonOperators;
      watcherConditionsVM.canBeEdit = editable;

      loadConditionsData(conditionsData);

      function goToTrigger() {
        saveCondition();
        $state.go('watch.watchers.create.trigger');
      }

      function goToActions() {
        saveCondition();
        $state.go('watch.watchers.create.actions.list');
      }

      function getConditionTypes() {
        return watchers.getConditionTypes();
      }

      function getScriptTypes() {
        return watchers.getScriptTypes();
      }

      function getScriptLanguages() {
        return watchers.getScriptLanguages();
      }

      function updateType() {
        watcherConditionsVM.condition = {};
        watcherConditionsVM.condition[watcherConditionsVM.type] = {};
        watcherConditionsVM.leftOperand = watcherConditionsVM.rightOperand = watcherConditionsVM.rightOperandName = watcherConditionsVM.operator = '';
      }

      function updateScriptType() {
        // We reset the script as we change its type
        watcherConditionsVM.condition.script = {};
        watcherConditionsVM.condition.script[watcherConditionsVM.scriptType] = '';
      }

      function addParameter(name, value) {
        if (!_.isEmpty(name) && !_.isEmpty(value)) {
          var params = watcherConditionsVM.condition.params || {};
          params[name] = value;
          watcherConditionsVM.condition.params = params;
        }
      }

      function removeParameter(name) {
        var params = {};
        angular.forEach(_.keys(watcherConditionsVM.condition.params), function(p) {
          if (p !== name) {
            params[p] = watcherConditionsVM.condition.params[p];
          }
        });
        watcherConditionsVM.condition.params = params;
      }

      function getParameters() {
        return _.keys(watcherConditionsVM.condition.params);
      }

      function getComparisonOperators() {
        return watchers.getComparisonOperators();
      }

      function saveCondition() {
        if (watcherConditionsVM.type === ConditionTypes.COMPARE) {
          watcherConditionsVM.condition['compare'] = {};
          watcherConditionsVM.condition.compare[watcherConditionsVM.leftOperand] = {};
          watcherConditionsVM.condition.compare[watcherConditionsVM.leftOperand][watcherConditionsVM.operator] = watcherConditionsVM.rightOperand;
        }
        else if (watcherConditionsVM.type === ConditionTypes.ARRAY_COMPARE) {
          watcherConditionsVM.condition = {};
          watcherConditionsVM.condition['array_compare'] = {};
          watcherConditionsVM.condition.array_compare[watcherConditionsVM.leftOperand] = {};
          watcherConditionsVM.condition.array_compare[watcherConditionsVM.leftOperand][watcherConditionsVM.operator] = {};
          watcherConditionsVM.condition.array_compare[watcherConditionsVM.leftOperand][watcherConditionsVM.operator][watcherConditionsVM.rightOperandName] = watcherConditionsVM.rightOperand;

          if (!_.isNull(watcherConditionsVM.path)) {
            watcherConditionsVM.condition.array_compare[watcherConditionsVM.leftOperand]['path'] = watcherConditionsVM.path;
          }

          if (!_.isNull(watcherConditionsVM.quantifier)) {
            watcherConditionsVM.condition.array_compare[watcherConditionsVM.leftOperand][watcherConditionsVM.operator]['quantifier'] = watcherConditionsVM.quantifier;
          }
        }
        watchers.setWatcherCondition(watcherConditionsVM.condition);
      }

      function loadConditionsData(data) {
        if (!_.isEmpty(_.keys(data))) {
          watcherConditionsVM.condition = data;

          if (watcherConditionsVM.type === 'script') {
            if (!_.isUndefined(data.script.inline)) {
              watcherConditionsVM.scriptType = 'inline';
            }
            else if (!_.isUndefined(data.script.file)) {
              watcherConditionsVM.scriptType = 'file';
            }
            else if (!_.isUndefined(data.script.id)) {
              watcherConditionsVM.scriptType = 'id';
            }
          }
          else if (watcherConditionsVM.type === ConditionTypes.COMPARE) {
            watcherConditionsVM.arrayCompare = _.contains(_.keys(watcherConditionsVM.condition), 'array_compare');

            if (!_.isEmpty(_.keys(data.compare))) {
              watcherConditionsVM.leftOperand = _.keys(data.compare)[0];
              watcherConditionsVM.operator = _.keys(_.values(data.compare)[0])[0];
              watcherConditionsVM.rightOperand = _.values(_.values(data.compare)[0])[0];
            }
          }
          else if (watcherConditionsVM.type === ConditionTypes.ARRAY_COMPARE) {
            if (!_.isEmpty(_.keys(data.array_compare))) {
              watcherConditionsVM.leftOperand = _.keys(data.array_compare)[0];
              watcherConditionsVM.operator = _.intersection(_.keys(data.array_compare[watcherConditionsVM.leftOperand]), watcherConditionsVM.getComparisonOperators())[0] || null;

              if (!_.isNull(watcherConditionsVM.operator)) {
                var rightOperandObject = data.array_compare[watcherConditionsVM.leftOperand][watcherConditionsVM.operator];
                var rightOperandName = null;
                var rightOperand = null;
                var quantifier = null;

                angular.forEach(_.keys(rightOperandObject), function(k) {
                  if (k === 'quantifier') {
                    quantifier = rightOperandObject[k];
                  }
                  else {
                    rightOperandName = k;
                    rightOperand = rightOperandObject[k];
                  }
                });
                watcherConditionsVM.rightOperandName = rightOperandName;
                watcherConditionsVM.rightOperand = rightOperand;
                watcherConditionsVM.quantifier = quantifier;
              }
              watcherConditionsVM.path = data.array_compare[watcherConditionsVM.leftOperand].path;
            }
          }
        }
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

    WatcherInputCtrl.$inject = ['$scope', '$state', 'watchers', 'WatchInputType', 'inputsData', 'editable'];

    function WatcherInputCtrl($scope, $state, watchers, WatchInputType, inputsData, editable) {
      var watcherInputVM = this;

      watcherInputVM.input = {};
      watcherInputVM.type = (_.keys(inputsData)[0]) || '';
      watcherInputVM.simple = watcherInputVM.search = watcherInputVM.http = {};
      watcherInputVM.chipsData = { indices: [], types: [] };
      watcherInputVM.extractChipsData = [];

      watcherInputVM.goToTrigger = goToTrigger;
      watcherInputVM.getPrettyInput = getPrettyInput;

      watcherInputVM.getSearchRequestTypes = getSearchRequestTypes;
      watcherInputVM.getTypes = getTypes;
      watcherInputVM.getSimpleTypes = getSimpleTypes;
      watcherInputVM.getExpandWildCards = getExpandWildCards;
      watcherInputVM.getResponseTypes = getResponseTypes;
      watcherInputVM.resetExtractData = resetExtractData;
      watcherInputVM.addHeader = addHeader;
      watcherInputVM.removeHeader = removeHeader;
      watcherInputVM.getHeaders = getHeaders;
      watcherInputVM.addParameter = addParameter;
      watcherInputVM.removeParameter = removeParameter;
      watcherInputVM.getParameters = getParameters;
      watcherInputVM.canBeEdit = editable;

      watcherInputVM.addSimpleInputType = addSimpleInputType;

      loadInputsData(inputsData);

      function goToTrigger() {
        saveInput();
        $state.go('watch.watchers.create.trigger');
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
      }

      function getPrettyInput() {
        return angular.toJson(watcherInputVM.input, true);
      }

      function getExpandWildCards() {
        return watchers.getExpandWildCards();
      }

      function getResponseTypes() {
        return watchers.getResponseContentTypes();
      }

      function saveInput() {
        angular.forEach(_.keys(watcherInputVM.chipsData), function(data) {
          if (!_.isEmpty(data)) {
            if (watcherInputVM.type === WatchInputType.SEARCH) {
              var request = watcherInputVM.search.request || {};
              request[data] = watcherInputVM.chipsData[data];
              watcherInputVM.search.request = request;
            }
          }
        });
        if (!_.isEmpty(watcherInputVM.extractChipsData)) {
          watcherInputVM[watcherInputVM.type].extract = watcherInputVM.extractChipsData;
        }
        var input = {};
        input[watcherInputVM.type] = watcherInputVM[watcherInputVM.type];
        watchers.setWatcherInput(input);
      }

      function loadInputsData(data) {
        watcherInputVM[watcherInputVM.type] = data[watcherInputVM.type];

        if (watcherInputVM.type === WatchInputType.SEARCH) {
          angular.forEach(_.keys(watcherInputVM.chipsData), function(data) {
            if (!_.isUndefined(watcherInputVM.search.request[data])) {
              watcherInputVM.chipsData[data] = watcherInputVM.search.request[data];
            }
          });
        }

        if (!_.isEmpty(watcherInputVM.type) && !_.isUndefined(watcherInputVM[watcherInputVM.type].extract)) {
          watcherInputVM.extractChipsData = watcherInputVM[watcherInputVM.type].extract;
        }
      }

      function resetExtractData() {
        watcherInputVM.extractChipsData = [];
      }

      function addHeader(name, value) {
        if (!_.isEmpty(name) && !_.isEmpty(value)) {
          var headers = watcherInputVM.http.headers || {};
          headers[name] = value;
          watcherInputVM.http.headers = headers;
        }
      }

      function removeHeader(name) {
        var headers = {};
        angular.forEach(_.keys(watcherInputVM.http.headers), function(p) {
          if (p !== name) {
            headers[p] = watcherInputVM.http.headers[p];
          }
        });
        watcherInputVM.http.headers = headers;
      }

      function getHeaders() {
        return _.keys(watcherInputVM.http.headers);
      }

      function addParameter(name, value) {
        if (!_.isEmpty(name) && !_.isEmpty(value)) {
          var parameters = watcherInputVM.http.params || {};
          parameters[name] = value;
          watcherInputVM.http.params = parameters;
        }
      }

      function removeParameter(name) {
        var parameters = {};
        angular.forEach(_.keys(watcherInputVM.http.params), function(p) {
          if (p !== name) {
            parameters[p] = watcherInputVM.http.params[p];
          }
        });
        watcherInputVM.http.params = parameters;
      }

      function getParameters() {
        return _.keys(watcherInputVM.http.params);
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
    .controller('WatchersListCtrl', WatchersListCtrl);

    WatchersListCtrl.$inject = ['$scope', '$state', 'watchers', 'elastic', 'watchersListData'];

    function WatchersListCtrl($scope, $state, watchers, elastic, watchersListData) {
      var watchersListVM = this;

      watchersListVM.watchers = watchersListData || {};
      watchersListVM.displayWatchers = displayWatchers;
      watchersListVM.displayWatcher = displayWatcher;
      watchersListVM.iconFor = iconFor;
      watchersListVM.goToCreate = goToCreate;

      function displayWatchers() {
        return !_.isEmpty(watchersListVM.watchers);
      }

      function displayWatcher(name) {
        elastic.getWatcher(name)
          .success(function(w) {
            watchers.loadWatcher(w);
            $state.go('watch.watchers.create.summary.pretty');
          })
          .error(function(error) {

          });
      }

      function goToCreate() {
        watchers.resetWatcher();
        $state.go('watch.watchers.create.input');
      }

      function iconFor(watcher) {
        return watcher.active ? 'thumb_up' : 'thumb_down';
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSaveCtrl', WatcherSaveCtrl);

    WatcherSaveCtrl.$inject = ['$scope', '$mdDialog'];

    function WatcherSaveCtrl($scope, $mdDialog) {
      var watcherSaveVM = this;

      watcherSaveVM.name = '';
      watcherSaveVM.cancelForm = cancelForm;
      watcherSaveVM.saveWatcher = saveWatcher;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function saveWatcher() {
        if (watcherSaveVM.name.trim().length > 0) {
          $mdDialog.hide(watcherSaveVM.name.trim());
        }
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryCtrl', WatcherSummaryCtrl);

    WatcherSummaryCtrl.$inject = ['$scope', '$state', '$mdDialog', 'elastic', 'notifications', 'watcherSummary'];

    function WatcherSummaryCtrl($scope, $state, $mdDialog, elastic, notifications, watcherSummary) {
      var watcherSummaryVM = this;

      watcherSummaryVM.definition = watcherSummary;
      watcherSummaryVM.goToActions = goToActions;
      watcherSummaryVM.saveWatcher = saveWatcher;

      function goToActions() {
        $state.go('watch.watchers.create.actions.list');
      }

      function saveWatcher() {
        $mdDialog.show({
          controller: 'WatcherSaveCtrl',
          controllerAs: 'watcherSaveVM',
          templateUrl: 'assets/templates/watchers.save.html',
          parent: angular.element(document.body),
          targetEvent: event
        }).then(function(name) {
          elastic.createWatcher(name, watcherSummaryVM.definition)
            .success(function() {
              notifications.showSimple('The watcher with name "' + name + '" has successfully been created!');
              $state.go('watch.watchers.list');
            })
            .error(function(error) {
              console.log('Error while creating the watcher with name ' + name + ': ' + error.data || "Request failed");
              console.log('Error status: ' + error.status);
              notifications.showSimple('An error occured while creating the watcher with name "' + name + '"...');
            });
        });
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryJsonController', WatcherSummaryJsonController);

    WatcherSummaryJsonController.$inject = ['$scope', '$mdDialog', 'jsonData'];

    function WatcherSummaryJsonController($scope, $mdDialog, jsonData) {
      var watcherJsonVM = this;

      watcherJsonVM.json = jsonData;
      watcherJsonVM.cancelForm = cancelForm;
      watcherJsonVM.close = close;

      function cancelForm() {
        $mdDialog.cancel();
      }

      function close() {
        $mdDialog.hide();
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryRawCtrl', WatcherSummaryRawCtrl);

    WatcherSummaryRawCtrl.$inject = ['$scope', '$mdDialog', 'jsonData'];

    function WatcherSummaryRawCtrl($scope, $mdDialog, jsonData) {
      var watcherSummaryRawVM = this;

      watcherSummaryRawVM.json = jsonData;
      watcherSummaryRawVM.show = show;

      function show($event) {
        $mdDialog.show({
          controller: 'WatcherSummaryJsonController',
          controllerAs: 'watcherJsonVM',
          templateUrl: 'assets/templates/watchers.summary.json.dialog.html',
          parent: angular.element(document.body),
          resolve: {
            jsonData: function() { return watcherSummaryRawVM.json; }
          },
          targetEvent: event
        });
      }
    }
})();

(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherTriggerCtrl', WatcherTriggerCtrl);

    WatcherTriggerCtrl.$inject = ['$scope', '$state', 'watchers', 'ScheduleTriggerTypes', 'triggersData', 'editable'];

    function WatcherTriggerCtrl($scope, $state, watchers, ScheduleTriggerTypes, triggersData, editable) {
      var watcherTriggerVM = this;

      watcherTriggerVM.type = (_.keys(triggersData.schedule)[0]) || '';
      watcherTriggerVM.schedule = {};
      watcherTriggerVM.hours = [];
      watcherTriggerVM.dailyData = { times: [], hours: [], minutes: [] };
      watcherTriggerVM.dailyTimes = watcherTriggerVM.weeklyTimes = watcherTriggerVM.monthlyTimes = watcherTriggerVM.yearlyTimes = true;;
      watcherTriggerVM.weeklyData = { times: [], days: [], hours: [] };
      watcherTriggerVM.monthlyData = { times: [], days: [], hours: [] };
      watcherTriggerVM.yearlyData = { times: [], months: [], days: [], hours: [] };

      watcherTriggerVM.goToInput = goToInput;
      watcherTriggerVM.goToConditions = goToConditions;
      watcherTriggerVM.saveTrigger = saveTrigger;
      watcherTriggerVM.canBeEdit = editable;

      watcherTriggerVM.getTriggerTypes = getTriggerTypes;

      loadData(triggersData);

      function goToInput() {
        watcherTriggerVM.saveTrigger();
        $state.go('watch.watchers.create.input');
      }

      function goToConditions() {
        watcherTriggerVM.saveTrigger();
        $state.go('watch.watchers.create.conditions');
      }

      function saveTrigger() {
        if (watcherTriggerVM.type === ScheduleTriggerTypes.HOURLY) {
          watcherTriggerVM.schedule.hourly = watcherTriggerVM.hours;
        }
        else if (watcherTriggerVM.type === ScheduleTriggerTypes.DAILY) {
          if (watcherTriggerVM.dailyTimes) {
            watcherTriggerVM.schedule.daily = { at: watcherTriggerVM.dailyData.times };
          }
          else {
            watcherTriggerVM.schedule.daily = { at: { hour: watcherTriggerVM.dailyData.hours, minute: watcherTriggerVM.dailyData.minutes }};
          }
        }
        else if (watcherTriggerVM.type === ScheduleTriggerTypes.WEEKLY) {
          watcherTriggerVM.schedule.weekly = transformWeeklyData(watcherTriggerVM.weeklyData);
        }
        else if (watcherTriggerVM.type === ScheduleTriggerTypes.MONTHLY) {
          watcherTriggerVM.schedule.monthly = transformMonthlyData(watcherTriggerVM.monthlyData);
        }
        else if (watcherTriggerVM.type === ScheduleTriggerTypes.YEARLY) {
          watcherTriggerVM.schedule.yearly = transformYearlyData(watcherTriggerVM.yearlyData);
        }
        watchers.setWatcherScheduleTrigger(watcherTriggerVM.schedule);
      }

      function transformWeeklyData(data) {
        if (watcherTriggerVM.weeklyTimes) {
          return _.map(watcherTriggerVM.weeklyData.times, function(weekDay) {
            var day = weekDay.split('@');
            return { on: day[0], at: day[1] };
          });
        }
        else {
          return { on: data.days, at: data.hours };
        }
      }

      function transformMonthlyData(data) {
        if (watcherTriggerVM.monthlyTimes) {
          return _.map(watcherTriggerVM.monthlyData.times, function(monthDay) {
            var day = monthDay.split('@');
            return { on: day[0], at: day[1] };
          });
        }
        else {
          return { on: data.days, at: data.hours };
        }
      }

      function transformYearlyData(data) {
        if (watcherTriggerVM.yearlyTimes) {
          return _.map(watcherTriggerVM.yearlyData.times, function(yearDay) {
            var day = yearDay.split('@');
            return { in: day[0].substring(0, day[0].length - 2), on: day[0].substring(day[0].length - 2), at: day[1] };
          });
        }
        else {
          return { in: data.months, on: data.days, at: data.hours };
        }
      }

      function getTriggerTypes() {
        return watchers.getScheduleTriggerTypes();
      }

      function loadData(data) {
        if (!_.isEmpty(_.keys(data))) {
          data = data.schedule;
          var type = _.keys(data)[0];

          if (type === ScheduleTriggerTypes.HOURLY) {
            watcherTriggerVM.hours = data.hourly;
          }
          else if (type === ScheduleTriggerTypes.DAILY) {
            loadDailyData(data.daily.at);
          }
          else if (type === ScheduleTriggerTypes.WEEKLY) {
            loadWeeklyData(data.weekly);
          }
          else if (type === ScheduleTriggerTypes.MONTHLY) {
            loadMonthlyData(data.monthly);
          }
          else if (type === ScheduleTriggerTypes.YEARLY) {
            loadYearlyData(data.yearly);
          }
          else if (type === ScheduleTriggerTypes.INTERVAL) {
            watcherTriggerVM.schedule.interval = data.interval;
          }
        }
      }

      function loadDailyData(trigger) {
        watcherTriggerVM.dailyTimes = _.isArray(trigger);

        if (watcherTriggerVM.dailyTimes) {
          watcherTriggerVM.dailyData = { times: trigger, hours: [], minutes: [] };
        }
        else {
          watcherTriggerVM.dailyData = { times: [], hours: trigger.hour, minutes: trigger.minute };
        }
      }

      function loadWeeklyData(trigger) {
        watcherTriggerVM.weeklyTimes = _.isArray(trigger);

        if (watcherTriggerVM.weeklyTimes) {
          watcherTriggerVM.weeklyData.times = _.map(trigger, function(day) {
            return day.on + '@' + day.at;
          });
        }
        else {
          watcherTriggerVM.weeklyData.days = trigger.on;
          watcherTriggerVM.weeklyData.hours = trigger.at;
        }
      }

      function loadMonthlyData(trigger) {
        watcherTriggerVM.monthlyTimes = _.isArray(trigger);

        if (watcherTriggerVM.monthlyTimes) {
          watcherTriggerVM.monthlyData.times = _.map(trigger, function(day) {
            return day.on + '@' + day.at;
          });
        }
        else {
          watcherTriggerVM.monthlyData.days = trigger.on;
          watcherTriggerVM.monthlyData.hours = trigger.at;
        }
      }

      function loadYearlyData(trigger) {
        watcherTriggerVM.yearlyTimes = _.isArray(trigger);

        if (watcherTriggerVM.yearlyTimes) {
          watcherTriggerVM.yearlyData.times = _.map(trigger, function(day) {
            return day.in + day.on + '@' + day.at;
          });
        }
        else {
          watcherTriggerVM.yearlyData.months = trigger.in;
          watcherTriggerVM.yearlyData.days = trigger.on;
          watcherTriggerVM.yearlyData.hours = trigger.at;
        }
      }
    }
})();
