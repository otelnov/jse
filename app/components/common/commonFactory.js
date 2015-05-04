export default ngModule => {
  ngModule.factory('CommonFactory', [
    '$q', 'API_URL', '$http', 'AuthTokenFactory',
    function ($q, API_URL, $http, AuthTokenFactory) {
      var userObj;

      return {
        currentUser: currentUser
      };

      function currentUser(update) {
        if (!AuthTokenFactory.getToken()) {
          return $q.reject({data: 'client has no auth token'});
        }

        var deferred = $q.defer();

        if (userObj && !update) {
          deferred.resolve(userObj);
          return deferred.promise;
        }

        $http.get(API_URL + '/users/current').then(function (res) {
          deferred.resolve(res.data);
          userObj = res.data;
        }, function (err) {
          if (AuthTokenFactory.getToken()) {
            AuthTokenFactory.setToken();
          }
          deferred.reject(err);
        });
        return deferred.promise;
      }
    }
  ]);
};
