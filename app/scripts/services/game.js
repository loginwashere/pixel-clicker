'use strict';

angular.module('clientApp')
    .service('game', function Game() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var self = this;

        this.init = function () {
            this.clock = 0;
            this.numberOfClicks = 0;
            this.products = [
                {
                    "name": "cursor",
                    "quantity": 0,
                    "icon": "glyphicon-star",
                    "currentPrice": 100
                },
                {
                    "name": "granny",
                    "quantity": 0,
                    "icon": "glyphicon-star",
                    "currentPrice": 200
                },
                {
                    "name": "farm",
                    "quantity": 0,
                    "icon": "glyphicon-star",
                    "currentPrice": 200
                },
                {
                    "name": "factory",
                    "quantity": 0,
                    "icon": "glyphicon-star-empty",
                    "currentPrice": 200
                },
                {
                    "name": "delivery",
                    "quantity": 0,
                    "icon": "glyphicon-star",
                    "currentPrice": 200
                },
                {
                    "name": "lab",
                    "quantity": 0,
                    "icon": "glyphicon-star",
                    "currentPrice": 200
                },
                {
                    "name": "portal",
                    "quantity": 0,
                    "icon": "glyphicon-star",
                    "currentPrice": 200
                },
                {
                    "name": "time machine",
                    "quantity": 0,
                    "icon": "glyphicon-star",
                    "currentPrice": 200
                }
            ];
        };

        this.loop = function (scope) {
            setInterval(function () {
                scope.$apply(function () {
                    self.clock += 111111111111111111;
                    scope.clock = self.clock;
                });
            }, 1000 / 60);
        };

        this.clickPixel = function (scope) {
            return function () {
                self.numberOfClicks++;
                console.log(self.clock);
                scope.numberOfClicks = self.numberOfClicks;
            }
        };

        this.getClock = function () {
            return this.clock;
        };

        this.getNumberOfClicks = function () {
            return this.numberOfClicks;
        };

        this.getProducts = function () {
            return this.products;
        };
    });
