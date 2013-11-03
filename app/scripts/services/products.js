'use strict';

angular.module('clientApp')
    .service('products', function Products() {
        var self = this;

        this.buy = function (items) {
            items.items.push({
                price: items.currentPrice
            });
            items.currentPrice += items.currentPrice;
        };

        this.sell = function (items) {
            if (items.items.length >= 1) {
                var current = items.items.pop();
                items.currentPrice = current.price;
            }
        };

        this.calculateIncrement = function (items) {
            return items.items.length * items.productivity;
        };

        this.cursors = {
            name: 'cursors',
            title: 'Cursor',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getCursors().items.length;
            },
            icon: 'glyphicon-star',
            currentPrice: 10,
            productivity: 0.1,
            items: [],
            buy: function () {
                var items = self.getCursors();
                self.buy(items);
            },
            sell: function () {
                var items = self.getCursors();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getCursors();
                return self.calculateIncrement(items);
            }
        };

        this.grannies = {
            name: 'grannies',
            title: 'Granny',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getGrannies().items.length;
            },
            icon: 'glyphicon-star',
            currentPrice: 200,
            productivity: 0.5,
            items: [],
            buy: function () {
                var items = self.getGrannies();
                self.buy(items);
            },
            sell: function () {
                var items = self.getGrannies();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getGrannies();
                return self.calculateIncrement(items);
            }
        };

        this.farms = {
            name: 'farms',
            title: 'Farm',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getFarms().items.length;
            },
            icon: 'glyphicon-star',
            currentPrice: 300,
            productivity: 2,
            items: [],
            buy: function () {
                var items = self.getFarms();
                self.buy(items);
            },
            sell: function () {
                var items = self.getFarms();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getFarms();
                return self.calculateIncrement(items);
            }
        };

        this.factories = {
            name: 'factories',
            title: 'Factory',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getFactories().items.length;
            },
            icon: 'glyphicon-star-empty',
            currentPrice: 400,
            productivity: 10,
            items: [],
            buy: function () {
                var items = self.getFactories();
                self.buy(items);
            },
            sell: function () {
                var items = self.getFactories();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getFactories();
                return self.calculateIncrement(items);
            }
        };

        this.deliveries = {
            name: 'deliveries',
            title: 'Delivery',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getDeliveries().items.length;
            },
            icon: 'glyphicon-star',
            currentPrice: 500,
            productivity: 40,
            items: [],
            buy: function () {
                var items = self.getDeliveries();
                self.buy(items);
            },
            sell: function () {
                var items = self.getDeliveries();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getDeliveries();
                return self.calculateIncrement(items);
            }
        };

        this.labs = {
            name: 'labs',
            title: 'Lab',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getLabs().items.length;
            },
            icon: 'glyphicon-star',
            currentPrice: 600,
            productivity: 100,
            items: [],
            buy: function () {
                var items = self.getLabs();
                self.buy(items);
            },
            sell: function () {
                var items = self.getLabs();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getLabs();
                return self.calculateIncrement(items);
            }
        };

        this.portals = {
            name: 'portals',
            title: 'Portal',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getPortals().items.length;
            },
            icon: 'glyphicon-star',
            currentPrice: 700,
            productivity: 6666,
            items: [],
            buy: function () {
                var items = self.getPortals();
                self.buy(items);
            },
            sell: function () {
                var items = self.getPortals();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getPortals();
                return self.calculateIncrement(items);
            }
        };

        this.timeMachines = {
            name: 'timeMachines',
            title: 'Time Machine',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.',
            image: 'http://placehold.it/100x100',
            quantity: function () {
                return self.getTimeMachines().items.length;
            },
            icon: 'glyphicon-star',
            currentPrice: 800,
            productivity: 90000,
            items: [],
            buy: function () {
                var items = self.getTimeMachines();
                self.buy(items);
            },
            sell: function () {
                var items = self.getTimeMachines();
                self.sell(items);
            },
            calculateIncrement: function () {
                var items = self.getTimeMachines();
                return self.calculateIncrement(items);
            }
        };

        this.getCursors = function () {
            return this.cursors;
        };

        this.getGrannies = function () {
            return this.grannies;
        };

        this.getFarms = function () {
            return this.farms;
        };

        this.getFactories = function () {
            return this.factories;
        };

        this.getDeliveries = function () {
            return this.deliveries;
        };

        this.getLabs = function () {
            return this.labs;
        };

        this.getPortals = function () {
            return this.portals;
        };

        this.getTimeMachines = function () {
            return this.timeMachines;
        };

        this.getProducts = function () {
            return this.products;
        };

        this.getProductByType = function (type) {
            return this[type];
        };

        this.products = [
            this.getCursors(),
            this.getGrannies(),
            this.getFarms(),
            this.getFactories(),
            this.getDeliveries(),
            this.getLabs(),
            this.getPortals(),
            this.getTimeMachines()
        ];
    });
