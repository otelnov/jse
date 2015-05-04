export default ngModule => {
  ngModule.controller('LoginCtrl', [
    'AuthFactory', '$state',
    function (authFactory, $state) {
      var vm = this;

      vm.model = {};
      vm.login = login;

      function login() {
        authFactory.login(vm.model, function (err) {
          if (err) {
            console.log(err);
            return;
          }
          $state.go('jse.private.dashboard', null, {reload: true});
        });
      }
    }
  ]);
};
