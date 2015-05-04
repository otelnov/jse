export default ngModule => {
  ngModule.controller('RegisterCtrl', [
    'AuthFactory', '$state',
    function (authFactory, $state) {
      var vm = this;

      vm.model = {};
      vm.register = register;

      function register() {
        authFactory.register(vm.model, function (err) {
          if (err) {
            console.log(err);
            return;
          }
          $state.go('jse.private.dashboard');
        });
      }
    }
  ]);
};
