export default ngModule => {
  ngModule.controller('CommonCtrl', [
    '$mdSidenav', '$window', '$state', 'AuthTokenFactory', 'CommonFactory',
    function ($mdSidenav, $window, $state, authTokenFactory, commonFactory) {
      var vm = this;

      commonFactory.currentUser().then(function () {
        vm.loggedIn = true;
      }, function () {
        vm.loggedIn = false;
      });

      vm.$state = $state;
      vm.logout = logout;
      vm.toogleMenu = toogleMenu;
      vm.styles = {
        height: ($window.innerHeight - 64) + 'px'
      };

      function toogleMenu() {
        $mdSidenav('left').toggle();
      }

      function logout() {
        toogleMenu();
        vm.loggedIn = false;
        authTokenFactory.setToken();
        $state.go('jse.guest.login');
      }
    }
  ]);
};
