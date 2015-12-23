(function() {
  'use strict';

  angular.module('nightwatch')
    .factory('notifications', notifications);

  notifications.$inject = ['$mdToast'];

  function notifications($mdToast) {
    return {
      showSimple: showSimple
    };

    function showSimple(message) {
      return $mdToast.show($mdToast.simple()
        .textContent(message)
        .position('top right')
        .hideDelay(3000));
    }
  }
})();
