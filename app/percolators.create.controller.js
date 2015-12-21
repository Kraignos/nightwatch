(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorCreateCtrl', PercolatorCreateCtrl);

    PercolatorCreateCtrl.$inject = ['$scope', '$mdDialog', 'elastic', 'data'];

    function PercolatorCreateCtrl($scope, $mdDialog, elastic, data) {
      var percolatorsCreateVM = this;

      percolatorsCreateVM.indice = data.indice;
      percolatorsCreateVM.name = null;
      percolatorsCreateVM.query = null;

      percolatorsCreateVM.createPercolator = createPercolator;
      percolatorsCreateVM.cancelForm = cancelForm;

      function createPercolator() {
        elastic.createPercolator(percolatorsCreateVM.indice, percolatorsCreateVM.name, percolatorsCreateVM.query)
          .success(function() {
            closeForm({ '_id': percolatorsCreateVM.name, '_source': percolatorsCreateVM.query });
          })
          .error(function() {
            console.error('an error occured');
            $mdDialog.cancel();
          });
      }

      function cancelForm() {
        $mdDialog.cancel();
      }

      function closeForm(percolator) {
        $mdDialog.hide(percolator);
      }
    }
})();
