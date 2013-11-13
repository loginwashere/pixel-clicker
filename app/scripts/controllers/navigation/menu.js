define(['../module', 'storejs'], function (controllers, store) {
    'use strict';

    controllers.controller('MenuCtrl', ['$scope', function ($scope) {
        $scope.content = 'Menu';
        $scope.saveGame = function(game) {
            store.set('game', game)
        };
    }]);
});