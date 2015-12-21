(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorsCtrl', PercolatorsCtrl);

    PercolatorsCtrl.$inject = ['$scope', '$mdDialog', 'elastic'];

    function PercolatorsCtrl($scope, $mdDialog, elastic) {
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
              percolatorsVM.percolators.splice(index, 1);
            })
            .error(function() {
              console.error('an error occured');
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
