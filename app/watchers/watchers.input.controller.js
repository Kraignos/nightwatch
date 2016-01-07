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
