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
      percolatorsVM.createPercolator = createPercolator;

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
        $scope.currentIndice = indice;
        $scope.currentIndices = percolatorsVM.indices;
        $scope.oldPercolators = percolatorsVM.percolators;
        $mdDialog.show({
          controller: PercolatorsCtrl,
          controllerAs: 'percolatorsVM',
          templateUrl: 'assets/templates/percolator.dialog.html',
          parent: angular.element(document.body),
          targetEvent: event,
          scope: $scope,
          preserveScope: true
        })
        .then(function() {
          percolatorsVM.percolators = $scope.oldPercolators;
          percolatorsVM.indices = $scope.currentIndices;
          percolatorsVM.indice = $scope.currentIndice;
        });
      }

      function cancelForm() {
        $mdDialog.cancel();
      }

      function createPercolator(indice, name, query) {
        elastic.createPercolator(indice, name, query)
          .success(function() {
            $mdDialog.cancel();
            $scope.oldPercolators.push({ '_id': name, '_source': query });
            percolatorsVM.percolators = $scope.oldPercolators;
            percolatorsVM.indices = $scope.currentIndices;
            percolatorsVM.indice = $scope.currentIndice;
          })
          .error(function() {
            console.error('an error occured');
            $mdDialog.cancel();
            percolatorsVM.percolators = $scope.oldPercolators;
            percolatorsVM.indices = $scope.currentIndices;
            percolatorsVM.indice = $scope.currentIndice;
          });
      }
    }
})();
