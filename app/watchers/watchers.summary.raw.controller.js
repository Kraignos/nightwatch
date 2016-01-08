(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryRawCtrl', WatcherSummaryRawCtrl);

    WatcherSummaryRawCtrl.$inject = ['$scope', '$mdDialog', 'jsonData'];

    function WatcherSummaryRawCtrl($scope, $mdDialog, jsonData) {
      var watcherSummaryRawVM = this;

      watcherSummaryRawVM.json = jsonData;
      watcherSummaryRawVM.show = show;

      function show($event) {
        $mdDialog.show({
          controller: 'WatcherSummaryJsonController',
          controllerAs: 'watcherJsonVM',
          templateUrl: 'assets/templates/watchers.summary.json.dialog.html',
          parent: angular.element(document.body),
          resolve: {
            jsonData: function() { return watcherSummaryRawVM.json; }
          },
          targetEvent: event
        });
      }
    }
})();
