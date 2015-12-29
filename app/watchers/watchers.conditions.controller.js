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
        $state.go('watch.watchers.trigger');
      }

      function goToActions() {
        saveCondition();
        $state.go('watch.watchers.actions.list');
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
