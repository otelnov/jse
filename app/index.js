let angular = require('angular');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('angular-ui-router');
require('angular-material-icons');
require('oclazyload');

let ngModule = angular.module('jse', ['ui.router', 'oc.lazyLoad', 'ngMaterial', 'ngMdIcons']);
require('./components/common')(ngModule);

ngModule.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$httpProvider',
  ($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider) => {

    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');

    $httpProvider.interceptors.push('AuthInterceptor');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('jse', {
        abstract: true,
        template: require('./components/common/layout.html'),
        controller: 'CommonCtrl',
        controllerAs: 'vm'
      })
      .state('jse.guest', {
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          checkAuth: function (CommonFactory, $state) {
            CommonFactory.currentUser().then(function (user) {
              if (user) {
                return $state.go('jse.private.dashboard');
              }
            });
          },
          lazy: function ($ocLazyLoad) {
            return $ocLazyLoad.load('./guest.js');
          }
        }
      })
      .state('jse.public', {
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          lazy: function ($ocLazyLoad) {
            return $ocLazyLoad.load('./public.js');
          }
        }
      })
      .state('jse.private', {
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          checkAuth: function (CommonFactory, $state) {
            CommonFactory.currentUser().then(angular.noop, function () {
              return $state.go('jse.guest.login');
            });
          },
          lazy: function ($ocLazyLoad) {
            return $ocLazyLoad.load('./private.js');
          }
        }
      })

      .state('jse.guest.login', {
        url: '/login',
        template: require('./components/guest/login.html'),
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('jse.guest.register', {
        url: '/register',
        template: require('./components/guest/register.html'),
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      })

      .state('jse.private.dashboard', {
        url: '/',
        template: 'dash',
        controller: 'DashboardCtrl',
        controllerAs: 'vm'
      })

      .state('jse.public.about', {
        url: '/about',
        template: require('./components/public/static.html'),
        controller: 'StaticCtrl',
        controllerAs: 'vm'
      })
      .state('jse.public.short', {
        url: '/:id',
        template: '',
        controller: 'ShortCtrl',
        controllerAs: 'vm'
      });

    $mdThemingProvider.theme('default')
      //.dark()
      .primaryPalette('cyan')
      .accentPalette('red');
  }
]);

ngModule.factory('AuthTokenFactory', function AuthTokenFactory($window) {
  var store = $window.localStorage;
  var key = 'auth-token';

  return {
    getToken: getToken,
    setToken: setToken
  };

  function getToken() {
    return store.getItem(key);
  }

  function setToken(token) {
    if (token) {
      store.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  }
});

ngModule.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
  return {
    request: addToken
  };

  function addToken(config) {
    var token = AuthTokenFactory.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }
});

ngModule.constant('API_URL', 'http://localhost:3000');
