define(['./module'], function (services) {
    'use strict';

    services.service('game', ['products', function Game(products) {
        return new (function (products) {
            var self = this;

            this.title = 'Pixel Clicker';

            this.numberOfClicks = 0;

            this.products = products.getProducts();

            this.formatNumber = function(x, decimal) {
                var parts = x.toString().split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                if (decimal) {
                    if (parts[1]) {
                        parts[1] = parts[1][0];
                    } else {
                        parts[1] = 0;
                    }
                }

                return parts.join('.');
            };

            this.formatInt = function(x){
                return self.formatNumber(x, false);
            };

            this.formatDecimal = function(x){
                return self.formatNumber(x, true);
            };

            this.getTitle = function(){
                return self.title;
            };

            this.loop = function (scope) {
                setInterval(function () {
                    scope.$apply(function () {
                        self.numberOfClicks += self.calculateIncrement();
                        scope.numberOfClicks = self.numberOfClicks;
                        scope.$root.numberOfClicks = self.formatDecimal(self.numberOfClicks);
                    });
                }, 1000 / 60);
            };

            this.clickPixel = function (scope) {
                return function () {
                    self.numberOfClicks++;
                    scope.numberOfClicks = self.numberOfClicks;
                };
            };

            this.getNumberOfClicks = function () {
                return this.numberOfClicks;
            };



            this.getProducts = function () {
                return this.products;
            };

            this.calculateIncrement = function() {
                var increment = 0;
                var products = this.getProducts();
                for (var product in products) {
                    increment += products[product].calculateIncrement();
                }
                return increment;
            };

            this.buy = function(type){
                var price = products.getProductByType(type).currentPrice;

                if (this.getNumberOfClicks() >= price) {
                    products.getProductByType(type).buy();

                    this.numberOfClicks -= price;
                }
            };

            this.sell = function(type){
                var price = products.getProductByType(type).currentPrice;
                products.getProductByType(type).sell();

                this.numberOfClicks += price;
            };

            this.canProductBeBought = function(type){
                var result = false;

                if (this.getNumberOfClicks() >= products.getProductByType(type).currentPrice) {
                    result = true;
                }
                return result;
            };

            this.canProductBeSoled = function(type){
                return products.getProductByType(type).items.length > 0;
            };

            return this;
        })(products);
    }]);
});