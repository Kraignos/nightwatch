(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSaveCtrl', WatcherSaveCtrl);

    WatcherSaveCtrl.$inject = ['$scope', '$mdDialog'];

    function WatcherSaveCtrl($scope, $mdDialog) {
      var watcherSaveVM = this;

      watcherSaveVM.name = '';

      function cancelForm() {
        $mdDialog.cancel();
      }

      function save() {
        if (watcherSaveVM.name.trim().length > 0) {
          $mdDialog.hide(watcherSaveVM.name.trim());
        }
      }
    }
})();
