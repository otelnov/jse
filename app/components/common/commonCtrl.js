export default ngModule => {
  ngModule.controller('CommonCtrl', [
    '$mdSidenav',
    function ($mdSidenav) {
      this.toogleMenu = function () {
        $mdSidenav('left').toggle();
      };
    }
  ]);
};
