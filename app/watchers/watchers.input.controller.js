(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherInputCtrl', WatcherInputCtrl);

    WatcherInputCtrl.$inject = ['$scope', '$state', 'watchers', 'watcherInputs'];

    function WatcherInputCtrl($scope, $state, watchers, watcherInputs) {
      var watcherInputVM = this;

      watcherInputVM.input = {};
      watcherInputVM.type = '';
      watcherInputVM.request = {};

      watcherInputVM.goToTrigger = goToTrigger;
      watcherInputVM.getSearchRequestTypes = getSearchRequestTypes;
      watcherInputVM.getTypes = getTypes;
      watcherInputVM.getSimpleTypes = getSimpleTypes;
      watcherInputVM.addSimpleInputType = addSimpleInputType;
      watcherInputVM.getPrettyInput = getPrettyInput;
      watcherInputVM.hasInput = hasInput;
      watcherInputVM.getExpandWildCards = getExpandWildCards;
      watcherInputVM.addSearchInputType = addSearchInputType;

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
      }

      function transformToArray(values) {
        return _.map(values.trim().split(','), function(v) {
          return v.trim();
        });
      }
    }
})();
