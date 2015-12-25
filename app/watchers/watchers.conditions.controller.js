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
        var params = watcherConditionsVM.condition.params || {};
        params[name] = value;
        watcherConditionsVM.condition.params = params;
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
