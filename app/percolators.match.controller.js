(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('PercolatorMatchCtrl', PercolatorMatchCtrl);

    PercolatorMatchCtrl.$inject = ['$scope', '$mdDialog', 'elastic', 'data'];

    function PercolatorMatchCtrl($scope, $mdDialog, elastic, data) {
      var percolatorMatchVM = this;

      percolatorMatchVM.indice = data.indice;
      percolatorMatchVM.percolator = data.percolator;
      percolatorMatchVM.document = '';
      percolatorMatchVM.mappings = null;
      percolatorMatchVM.mapping = null;

      percolatorMatchVM.loadMappings = loadMappings;
      percolatorMatchVM.cancelForm = cancelForm;

      function loadMappings() {
        return elastic.indiceInfo(percolatorMatchVM.indice).then(function(response) {
          console.log('mappings: ' + angular.toJson(response));
          percolatorMatchVM.mappings = _.keys(response.data[percolatorMatchVM.indice].mappings);
        });
      }

      function cancelForm() {
        $mdDialog.cancel();
      }
    }
})();
