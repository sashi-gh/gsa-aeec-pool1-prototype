'use strict';

/**
 * @ngdoc function
 * @name gsaApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the gsaApp
 */
angular.module('gsaApp')
    .controller('HeaderController', ['$scope', '$location', function ($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

    }]);