'use strict';

angular.module('clientApp')
    .controller('MainCtrl', ['$scope', 'game', function ($scope, game) {
        $scope.title = 'Pixel Clicker';

        game.loop($scope);

        $scope.numberOfClicks = game.getNumberOfClicks();

        $scope.clickPixel = game.clickPixel($scope);
    }]);
