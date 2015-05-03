let angular = require('angular');
require('angular-material');
require('angular-animate');
require('angular-aria');
require('angular-ui-router');
require('angular-material-icons');
require('oclazyload');

let ngModule = angular.module('jse', ['ui.router', 'oc.lazyLoad', 'ngMaterial', 'ngMdIcons']);
require('./components/common')(ngModule);

ngModule.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
  ($stateProvider, $urlRouterProvider, $mdThemingProvider) => {

    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');

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

      .state('jse.guest.login', {
        url: '/',
        template: require('./components/guest/login.html'),
        controller: 'LoginCtrl',
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
      .primaryPalette('blue-grey')
      .accentPalette('red');
  }
]);
