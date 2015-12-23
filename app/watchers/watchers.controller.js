(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatchersCtrl', WatchersCtrl);

    WatchersCtrl.$inject = ['$scope', 'watchers'];

    function WatchersCtrl($scope, watchers) {
      var watchersVM = this;
    }
})();
