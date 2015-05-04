export default ngModule => {
  ngModule.controller('RegisterCtrl', [
    'AuthFactory',
    function (authFactory) {
      var vm = this;

      vm.model = {};
      vm.register = register;

      function register() {
        authFactory.register(vm.model).then(function (res) {
          console.log(res);
        });
      }
    }
  ]);
};
