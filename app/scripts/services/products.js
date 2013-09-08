'use strict';

angular.module('clientApp')
    .service('Products', function Products() {
        var self = this;

        this.buy = function(items){
            items['items'].push({
                "price": items['currentPrice']
            });
            items['currentPrice'] += items['currentPrice'];
        };

        this.sell = function(items){
            if (items['items'].length >= 1) {
                var current = items['items'].pop();
                items['currentPrice'] = current["price"];
            }
        };

        this.cursors = {
            "name": "cursor",
            "title": "Cursor",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getCursors()['items'].length;
            },
            "icon": "glyphicon-star",
            "currentPrice": 100,
            "items": [],
            "buy": function(){
                var items = self.getCursors();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getCursors();
                self.sell(items);
            }
        };

        this.grannies = {
            "name": "granny",
            "title": "Granny",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getGrannies()['items'].length;
            },
            "icon": "glyphicon-star",
            "currentPrice": 200,
            "items": [],
            "buy": function(){
                var items = self.getGrannies();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getGrannies();
                self.sell(items);
            }
        };

        this.farms = {
            "name": "farm",
            "title": "Farm",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getFarms()['items'].length;
            },
            "icon": "glyphicon-star",
            "currentPrice": 300,
            "items": [],
            "buy": function(){
                var items = self.getFarms();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getFarms();
                self.sell(items);
            }
        };

        this.factories = {
            "name": "factory",
            "title": "Factory",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getFactories()['items'].length;
            },
            "icon": "glyphicon-star-empty",
            "currentPrice": 400,
            "items": [],
            "buy": function(){
                var items = self.getFactories();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getFactories();
                self.sell(items);
            }
        };

        this.deliveries = {
            "name": "delivery",
            "title": "Delivery",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getDeliveries()['items'].length;
            },
            "icon": "glyphicon-star",
            "currentPrice": 500,
            "items": [],
            "buy": function(){
                var items = self.getDeliveries();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getDeliveries();
                self.sell(items);
            }
        };

        this.labs = {
            "name": "lab",
            "title": "Lab",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getLabs()['items'].length;
            },
            "icon": "glyphicon-star",
            "currentPrice": 600,
            "items": [],
            "buy": function(){
                var items = self.getLabs();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getLabs();
                self.sell(items);
            }
        };

        this.portals = {
            "name": "portal",
            "title": "Portal",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getPortals()['items'].length;
            },
            "icon": "glyphicon-star",
            "currentPrice": 700,
            "items": [],
            "buy": function(){
                var items = self.getPortals();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getPortals();
                self.sell(items);
            }
        };

        this.timeMachines = {
            "name": "timeMachine",
            "title": "Time Machine",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",
            "image": "http://placehold.it/100x100",
            "quantity": function(){
                return self.getTimeMachines()['items'].length;
            },
            "icon": "glyphicon-star",
            "currentPrice": 800,
            "items": [],
            "buy": function(){
                var items = self.getTimeMachines();
                self.buy(items);
            },
            "sell": function(){
                var items = self.getTimeMachines();
                self.sell(items);
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
