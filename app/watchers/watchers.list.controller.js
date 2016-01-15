(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatchersListCtrl', WatchersListCtrl);

    WatchersListCtrl.$inject = ['$scope', '$state', 'watchers', 'elastic', 'notifications', 'watchersListData'];

    function WatchersListCtrl($scope, $state, watchers, elastic, notifications, watchersListData) {
      var watchersListVM = this;

      watchersListVM.watchers = watchersListData || {};
      watchersListVM.displayWatchers = displayWatchers;
      watchersListVM.displayWatcher = displayWatcher;
      watchersListVM.updateState = updateState;
      watchersListVM.iconFor = iconFor;
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

      function updateState(watcher) {
        elastic.updateWatcherState(watcher.id, !watcher.active)
          .success(function(w) {
            watcher.active = !watcher.active;
            notifications.showSimple('Watcher with name: "' + watcher.id + '" has been updated!');
          })
          .error(function(error) {
            notifications.showSimple('An error occured while updating watcher with name: "' + watcher.id + '"...');
          });
      }

      function goToCreate() {
        watchers.resetWatcher();
        $state.go('watch.watchers.create.input');
      }

      function iconFor(watcher) {
        return watcher.active ? 'thumb_up' : 'thumb_down';
      }
    }
})();
