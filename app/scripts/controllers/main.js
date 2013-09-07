'use strict';

angular.module('clientApp')
    .controller('MainCtrl', ['$scope', 'game', function ($scope, game) {
        $scope.title = 'Pixel Clicker';

        game.init();

        $scope.clock = game.getClock();

        game.loop($scope);

        $scope.numberOfClicks = game.getNumberOfClicks();

        $scope.click = game.clickPixel($scope);
    }]);
