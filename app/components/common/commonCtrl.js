export default ngModule => {
  ngModule.controller('CommonCtrl', [
    '$mdSidenav', '$window', '$state',
    function ($mdSidenav, $window, $state) {
      this.toogleMenu = function () {
        $mdSidenav('left').toggle();
      };

      this.styles = {
        height: ($window.innerHeight - 64) + 'px'
      };

      this.$state = $state;
    }
  ]);
};
