(function() {
  'use strict';

  angular.module('nightwatch')
    .controller('WatchersListCtrl', WatchersListCtrl);

    WatchersListCtrl.$inject = ['$scope', '$state', '$mdDialog', 'watchers', 'elastic', 'notifications', 'watchersListData'];

    function WatchersListCtrl($scope, $state, $mdDialog, watchers, elastic, notifications, watchersListData) {
      var watchersListVM = this;

      watchersListVM.watchers = watchersListData || {};
      watchersListVM.displayWatchers = displayWatchers;
      watchersListVM.displayWatcher = displayWatcher;
      watchersListVM.updateState = updateState;
      watchersListVM.deleteWatcher = deleteWatcher;
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

      function deleteWatcher(event, name, i) {
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete this watcher?')
              .textContent('The watched called "' + name + '" will be deleted definitively. This action is irreversible!')
              .ariaLabel('Delete the watcher')
              .targetEvent(event)
              .ok('Yes, delete it')
              .cancel('No, don\'t do it');
        $mdDialog.show(confirm).then(function() {
          elastic.deleteWatcher(name)
            .success(function(w) {
              watchersListVM.watchers.splice(i, 1);
              notifications.showSimple('Watcher with name: "' + name + '" has been deleted!');
            })
            .error(function(error) {
              notifications.showSimple('An error occured while deleting watcher with name: "' + name + '"...');
            });
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
