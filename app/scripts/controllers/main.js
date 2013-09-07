'use strict';

angular.module('clientApp')
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.title = 'Pixel Clicker';

        $scope.numberOfClicks = 0;

        $scope.click = function(){
            $scope.numberOfClicks++;
        };
    }]);
