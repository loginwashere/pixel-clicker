'use strict';

angular.module('clientApp')
    .controller('MainCtrl', ['$scope', 'game', function ($scope, game) {
        $scope.game = game;
        $scope.clickPixel = game.clickPixel($scope);
        game.loop($scope);
    }]);
