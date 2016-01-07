(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatchersListCtrl', WatchersListCtrl);

    WatchersListCtrl.$inject = ['$scope', '$state', 'watchers', 'elastic', 'watchersListData'];

    function WatchersListCtrl($scope, $state, watchers, elastic, watchersListData) {
      var watchersListVM = this;

      watchersListVM.watchers = watchersListData || {};
      watchersListVM.displayWatchers = displayWatchers;
      watchersListVM.displayWatcher = displayWatcher;
      watchersListVM.goToCreate = goToCreate;

      function displayWatchers() {
        return !_.isEmpty(watchersListVM.watchers);
      }

      function displayWatcher(name) {
        elastic.getWatcher(name)
          .success(function(w) {
            watchers.loadWatcher(w);
            $state.go('watch.watchers.create.summary.pretty');
          })
          .error(function(error) {

          });
      }

      function goToCreate() {
        $state.go('watch.watchers.create.input');
      }
    }
})();
