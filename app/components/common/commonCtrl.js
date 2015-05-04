export default ngModule => {
  ngModule.controller('CommonCtrl', [
    '$mdSidenav', '$window', '$state', 'AuthTokenFactory',
    function ($mdSidenav, $window, $state, authTokenFactory) {

      var vm = this;
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
        authTokenFactory.setToken();
        $state.go('jse.guest.login');
      }
    }
  ]);
};
