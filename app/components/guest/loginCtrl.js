export default ngModule => {
  ngModule.controller('LoginCtrl', [
    'AuthFactory',
    function (authFactory) {
      var vm = this;

      vm.model = {};
      vm.login = login;

      function login() {
        authFactory.login(vm.model).then(function (res) {
          console.log(res);
        });
      }
    }
  ]);
};
