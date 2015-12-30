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

        $state.go('watch.watchers.actions.list');
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
