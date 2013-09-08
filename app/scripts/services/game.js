'use strict';

angular.module('clientApp')
    .service('game', function Game(Products) {
        return new (function (Products) {
            var self = this;

            this.numberOfClicks = 0;

            this.products = Products.getProducts();

            this.loop = function (scope) {
                setInterval(function () {
                    scope.$apply(function () {

                    });
                }, 1000 / 60);
            };

            this.clickPixel = function (scope) {
                return function () {
                    self.numberOfClicks++;
                    scope.numberOfClicks = self.numberOfClicks;
                }
            };

            this.getNumberOfClicks = function () {
                return this.numberOfClicks;
            };

            this.getProducts = function () {
                return this.products;
            };
        })(Products);
    }, {$inject: ['Products']});
