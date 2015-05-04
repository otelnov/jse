export default ngModule => {
  ngModule.factory('AuthFactory', [
    '$q', 'API_URL', '$http', 'AuthTokenFactory',
    function ($q, API_URL, $http, AuthTokenFactory) {

      function register(model, cb) {
        $http.post(API_URL + '/users/register', model)
          .then(function (response) {
            AuthTokenFactory.setToken(response.data.token);
            cb(false, response);
          }, function (err) {
            cb(err);
          });
      }

      function login(model, cb) {
        $http.post(API_URL + '/users/login', model)
          .then(function (response) {
            AuthTokenFactory.setToken(response.data.token);
            cb(false, response);
          }, function (err) {
            cb(err);
          });
      }

      return {
        register: register,
        login: login
      };
    }
  ]);
};
