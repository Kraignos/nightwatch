(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatchersListCtrl', WatchersListCtrl);

    WatchersListCtrl.$inject = ['$scope', '$state', 'watchers', 'watchersListData'];

    function WatchersListCtrl($scope, $state, watchers, watchersListData) {
      var watchersListVM = this;

      watchersListVM.watchers = watchersListData || {};
      watchersListVM.displayWatchers = displayWatchers;
      watchersListVM.goToCreate = goToCreate;

      function displayWatchers() {
        return !_.isEmpty(watchersListVM.watchers);
      }

      function goToCreate() {
        $state.go('watch.watchers.create.input');
      }
    }
})();
