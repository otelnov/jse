let angular = require('angular');
require('angular-ui-router');
require('oclazyload');

let ngModule = angular.module('jse', ['ui.router', 'oc.lazyLoad']);

ngModule.config(['$stateProvider', '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('jse', {
        abstract: true,
        views: {
          '@': {
            template: require('./components/common/layout.html')
          },
          'header@jse': {
            template: require('./components/common/header.html')
          }
        }
      })
      .state('jse.auth', {
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          lazy: function ($ocLazyLoad) {
            return $ocLazyLoad.load('./auth.js');
          }
        }
      })
      .state('jse.auth.login', {
        url: '/',
        template: require('./components/auth/login.html'),
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });
  }
]);
