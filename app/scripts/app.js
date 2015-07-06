'use strict';

/**
 * @ngdoc overview
 * @name gsaApp
 * @description
 * # d3OnAngularSeedApp
 *
 * Main module of the application.
 */
angular
  .module('gsaApp', [
    'ngResource',
    'ngRoute',
    'd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
         title: 'About'
      })
      .when('', {
              templateUrl: 'views/main.html',
              controller: 'MainCtrl',
              title: 'About'
            })
      .when('/demo', {
        templateUrl: 'views/demo.html',
        controller: 'DemoController',
        title: 'Demo'
      })
      .otherwise({
         templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                title: 'About'
      });
  });
