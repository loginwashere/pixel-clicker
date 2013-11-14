define(['../module', 'storejs'], function (controllers, store) {
    'use strict';

    controllers.controller('MenuCtrl', ['$scope', function ($scope) {
        $scope.content = 'Menu';
        $scope.gameContents = store.get('game');
        $scope.saveGame = function(game) {
            store.set('game', game);
            $scope.gameContents = store.get('game');
        };
        $scope.loadGame = function() {
            var game = store.get('game');
            console.log(game);
            $scope.game = game;
        }
    }]);
});