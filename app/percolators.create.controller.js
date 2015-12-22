(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorCreateCtrl', PercolatorCreateCtrl);

    PercolatorCreateCtrl.$inject = ['$scope', '$mdDialog', 'elastic', 'data', 'notifications'];

    function PercolatorCreateCtrl($scope, $mdDialog, elastic, data, notifications) {
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
            notifications.showSimple('The percolator with name "' + percolatorsCreateVM.name + '" has been created!');
          })
          .error(function() {
            $mdDialog.cancel();
            notifications.showSimple('An error occured while creating the percolator with name "' + percolatorsCreateVM.name + '"...');
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
