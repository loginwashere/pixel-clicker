'use strict';

angular.module('clientApp')
    .controller('ShopCtrl', ['$scope', 'game', function ($scope, game) {
        $scope.content = 'Shop';

        $scope.products = game.getProducts();
    }]);
