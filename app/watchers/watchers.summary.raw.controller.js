(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatcherSummaryRawCtrl', WatcherSummaryRawCtrl);

    WatcherSummaryRawCtrl.$inject = ['$scope', 'jsonData'];

    function WatcherSummaryRawCtrl($scope, jsonData) {
      var watcherSummaryRawVM = this;

      watcherSummaryRawVM.json = jsonData;
    }
})();
