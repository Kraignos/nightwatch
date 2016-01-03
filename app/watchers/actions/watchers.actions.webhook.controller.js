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
