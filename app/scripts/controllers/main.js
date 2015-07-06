'use strict';

/**
 * @ngdoc function
 * @name gsaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gsaApp
 */
angular.module('gsaApp')
  .controller('MainCtrl', function ($scope,$rootScope) {
    $scope.$on('$routeChangeSuccess', function (event, data) {
            $rootScope.pageTitle = data.title;
        });
  });
