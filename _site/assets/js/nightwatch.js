/*! nightwatch - v1.0.0 - 2015-12-26
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
            inputsData: inputsData
          },
          controller: 'WatcherInputCtrl',
          controllerAs: 'watcherInputVM'
        })
        .state('watch.watchers.trigger', {
          url: '/trigger',
          templateUrl: 'assets/templates/watchers.trigger.html',
          resolve: {
            triggersData: triggersData
          },
          controller: 'WatcherTriggerCtrl',
          controllerAs: 'watcherTriggerVM'
        })
        .state('watch.watchers.conditions', {
          url: '/conditions',
          templateUrl: 'assets/templates/watchers.conditions.html',
          resolve: {
            conditionsData: conditionsData
          },
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
          controllerAs: 'watcherSummaryVM',
          views: {
            'input': {
              templateUrl: 'assets/templates/watchers.input.html',
              resolve: {
                inputsData: inputsData
              },
              controller: 'WatcherInputCtrl',
              controllerAs: 'watcherInputVM'
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
    inputsData.$inject = ['watchers'];
    triggersData.$inject = ['watchers'];
    conditionsData.$inject = ['watchers'];
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

    function inputsData(watchers) {
      return watchers.getWatchInputs();
    }

    function triggersData(watchers) {
      return watchers.getWatchTriggers();
    }

    function conditionsData(watchers) {
      return watchers.getWatchConditions();
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
    })
    .constant('ConditionTypes', {
      ALWAYS: 'always',
      NEVER: 'never',
      SCRIPT: 'script',
      COMPARE: 'compare'
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
    .constant('ScriptLanguages', {
      GROOVY: 'groovy',
      JAVASCRIPT: 'javascript',
      PYTHON: 'python',
      EXPRESSION: 'expression',
      MUSTACHE: 'mustache'
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

  watchers.$inject = ['WatchInputType', 'SimpleInputType', 'SearchInputType', 'ExpandWildCards', 'ResponseContentType', 'ScheduleTriggerTypes', 'ConditionTypes', 'ScriptConditionTypes', 'ScriptLanguages'];

  function watchers(WatchInputType, SimpleInputType, SearchInputType, ExpandWildCards, ResponseContentType, ScheduleTriggerTypes, ConditionTypes, ScriptConditionTypes, ScriptLanguages) {
    var inputs = {};
    var triggers = {};
    var conditions = {};

    var service = {
      getInputTypes: getInputTypes,
      setSimpleWatcherInput: setSimpleWatcherInput,
      setSearchWatcherInput: setSearchWatcherInput,
      setHttpWatcherInput: setHttpWatcherInput,
      setWatcherInput: setWatcherInput,
      setWatcherScheduleTrigger: setWatcherScheduleTrigger,
      setWatcherCondition: setWatcherCondition,
      getWatchInputs: getWatchInputs,
      getWatchTriggers: getWatchTriggers,
      getWatchConditions: getWatchConditions,
      getWatcherSummary: getWatcherSummary,
      getSimpleInputTypes: getSimpleInputTypes,
      getSearchRequestTypes: getSearchRequestTypes,
      getExpandWildCards: getExpandWildCards,
      getResponseContentTypes: getResponseContentTypes,
      getScheduleTriggerTypes: getScheduleTriggerTypes,
      getConditionTypes: getConditionTypes,
      getScriptTypes: getScriptTypes,
      getScriptLanguages: getScriptLanguages,
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

    function setWatcherScheduleTrigger(schedule) {
      // Only schedule trigger is availale in ES so far
      triggers = schedule;
    }

    function setWatcherCondition(condition) {
      conditions = condition;
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

    function getInputTypes() {
      return [WatchInputType.SIMPLE, WatchInputType.SEARCH, WatchInputType.HTTP];
    }

    function getWatcherSummary() {
      var summary = {};
      summary['input'] = inputs;
      summary['trigger'] = triggers;
      summary['condition'] = conditions;
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
        ConditionTypes.COMPARE
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

    WatcherConditionsCtrl.$inject = ['$scope', '$state', 'watchers', 'conditionsData'];

    function WatcherConditionsCtrl($scope, $state, watchers, conditionsData) {
      var watcherConditionsVM = this;

      watcherConditionsVM.type = (_.keys(conditionsData)[0]) || '';
      watcherConditionsVM.scriptType = '';
      watcherConditionsVM.condition = {};

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

      loadConditionsData(conditionsData);

      function goToTrigger() {
        watchers.setWatcherCondition(watcherConditionsVM.condition);
        $state.go('watch.watchers.trigger');
      }

      function goToActions() {
        watchers.setWatcherCondition(watcherConditionsVM.condition);
        $state.go('watch.watchers.actions');
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

    WatcherInputCtrl.$inject = ['$scope', '$state', 'watchers', 'WatchInputType', 'inputsData'];

    function WatcherInputCtrl($scope, $state, watchers, WatchInputType, inputsData) {
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

      watcherInputVM.addSimpleInputType = addSimpleInputType;

      loadInputsData(inputsData);

      function goToTrigger() {
        saveInput();
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

    WatcherTriggerCtrl.$inject = ['$scope', '$state', 'watchers', 'ScheduleTriggerTypes', 'triggersData'];

    function WatcherTriggerCtrl($scope, $state, watchers, ScheduleTriggerTypes, triggersData) {
      var watcherTriggerVM = this;

      watcherTriggerVM.type = (_.keys(triggersData)[0]) || '';
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

      watcherTriggerVM.getTriggerTypes = getTriggerTypes;

      loadData(triggersData);

      function goToInput() {
        watcherTriggerVM.saveTrigger();
        $state.go('watch.watchers.input');
      }

      function goToConditions() {
        watcherTriggerVM.saveTrigger();
        $state.go('watch.watchers.conditions');
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
