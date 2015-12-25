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

      watcherInputVM.goToTrigger = goToTrigger;
      watcherInputVM.getPrettyInput = getPrettyInput;

      watcherInputVM.getSearchRequestTypes = getSearchRequestTypes;
      watcherInputVM.getTypes = getTypes;
      watcherInputVM.getSimpleTypes = getSimpleTypes;
      watcherInputVM.getExpandWildCards = getExpandWildCards;
      watcherInputVM.getResponseTypes = getResponseTypes;

      watcherInputVM.addSimpleInputType = addSimpleInputType;

      loadInputsData(inputsData);

      function goToTrigger() {
        var input = {};
        input[watcherInputVM.type] = watcherInputVM[watcherInputVM.type];
        watchers.setWatcherInput(input);
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

      function loadInputsData(data) {
        watcherInputVM[watcherInputVM.type] = data[watcherInputVM.type];
      }

      function transformToArray(values) {
        return _.map(values.trim().split(','), function(v) {
          return v.trim();
        });
      }
    }
})();
