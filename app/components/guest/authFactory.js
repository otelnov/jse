export default ngModule => {
  ngModule.factory('AuthFactory', [
    '$q', 'API_URL', '$http', 'AuthTokenFactory',
    function ($q, API_URL, $http, AuthTokenFactory) {

      function register(model) {
        return $http.post(API_URL + '/users/register', model)
          .then(function (response) {
            AuthTokenFactory.setToken(response.data.token);
            return response;
          });
      }

      function login(model) {
        return $http.post(API_URL + '/users/login', model)
          .then(function (response) {
            AuthTokenFactory.setToken(response.data.token);
            return response;
          });
      }

      return {
        register: register,
        login: login
      };
    }
  ]);
};
