define(['../module'], function (controllers) {
    'use strict';

    controllers.controller('ShopCtrl', ['$scope', 'game', function ($scope, game) {
        $scope.content = 'Shop';
    }]);
});