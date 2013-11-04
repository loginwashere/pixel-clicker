"use strict";angular.module("clientApp",["ui.bootstrap"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/pixel-clicker",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/pixel-clicker"}),b.html5Mode(!0)}]),angular.module("clientApp").controller("MainCtrl",["$scope","game",function(a,b){a.game=b,a.clickPixel=b.clickPixel(a),b.loop(a)}]),angular.module("clientApp").controller("ShopCtrl",["$scope","game",function(a){a.content="Shop"}]),angular.module("clientApp").controller("MenuCtrl",["$scope",function(a){a.content="Menu"}]),angular.module("clientApp").controller("StatsCtrl",["$scope",function(a){a.content="Stats"}]),angular.module("clientApp").controller("AboutCtrl",["$scope",function(a){a.content="About"}]),angular.module("clientApp").controller("UpdatesCtrl",["$scope",function(a){a.content="Updates"}]),angular.module("clientApp").controller("NavigationCtrl",["$scope",function(a){a.tabs=[{title:"Shop",content:"views/navigation/shop.html"},{title:"Menu",content:"views/navigation/menu.html"},{title:"Stats",content:"views/navigation/stats.html"},{title:"Updates",content:"views/navigation/updates.html"},{title:"About",content:"views/navigation/about.html"}],a.navType="pills"}]),angular.module("clientApp").service("game",["products",function(a){return new function(a){var b=this;return this.title="Pixel Clicker",this.numberOfClicks=0,this.products=a.getProducts(),this.formatNumber=function(a,b){var c=a.toString().split(".");return c[0]=c[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),b&&(c[1]=c[1]?c[1][0]:0),c.join(".")},this.formatInt=function(a){return b.formatNumber(a,!1)},this.formatDecimal=function(a){return b.formatNumber(a,!0)},this.getTitle=function(){return b.title},this.loop=function(a){setInterval(function(){a.$apply(function(){b.numberOfClicks+=b.calculateIncrement(),a.numberOfClicks=b.numberOfClicks,a.$root.numberOfClicks=b.formatDecimal(b.numberOfClicks)})},1e3/60)},this.clickPixel=function(a){return function(){b.numberOfClicks++,a.numberOfClicks=b.numberOfClicks}},this.getNumberOfClicks=function(){return this.numberOfClicks},this.getProducts=function(){return this.products},this.calculateIncrement=function(){var a=0,b=this.getProducts();for(var c in b)a+=b[c].calculateIncrement();return a},this.buy=function(b){var c=a.getProductByType(b).currentPrice;this.getNumberOfClicks()>=c&&(a.getProductByType(b).buy(),this.numberOfClicks-=c)},this.sell=function(b){var c=a.getProductByType(b).currentPrice;a.getProductByType(b).sell(),this.numberOfClicks+=c},this.canProductBeBought=function(b){var c=!1;return this.getNumberOfClicks()>=a.getProductByType(b).currentPrice&&(c=!0),c},this.canProductBeSoled=function(b){return a.getProductByType(b).items.length>0},this}(a)}]),angular.module("clientApp").service("products",function(){var a=this;this.buy=function(a){a.items.push({price:a.currentPrice}),a.currentPrice+=a.currentPrice},this.sell=function(a){if(a.items.length>=1){var b=a.items.pop();a.currentPrice=b.price}},this.calculateIncrement=function(a){return a.items.length*a.productivity},this.cursors={name:"cursors",title:"Cursor",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getCursors().items.length},icon:"glyphicon-star",currentPrice:10,productivity:.1,items:[],buy:function(){var b=a.getCursors();a.buy(b)},sell:function(){var b=a.getCursors();a.sell(b)},calculateIncrement:function(){var b=a.getCursors();return a.calculateIncrement(b)}},this.grannies={name:"grannies",title:"Granny",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getGrannies().items.length},icon:"glyphicon-star",currentPrice:200,productivity:.5,items:[],buy:function(){var b=a.getGrannies();a.buy(b)},sell:function(){var b=a.getGrannies();a.sell(b)},calculateIncrement:function(){var b=a.getGrannies();return a.calculateIncrement(b)}},this.farms={name:"farms",title:"Farm",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getFarms().items.length},icon:"glyphicon-star",currentPrice:300,productivity:2,items:[],buy:function(){var b=a.getFarms();a.buy(b)},sell:function(){var b=a.getFarms();a.sell(b)},calculateIncrement:function(){var b=a.getFarms();return a.calculateIncrement(b)}},this.factories={name:"factories",title:"Factory",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getFactories().items.length},icon:"glyphicon-star-empty",currentPrice:400,productivity:10,items:[],buy:function(){var b=a.getFactories();a.buy(b)},sell:function(){var b=a.getFactories();a.sell(b)},calculateIncrement:function(){var b=a.getFactories();return a.calculateIncrement(b)}},this.deliveries={name:"deliveries",title:"Delivery",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getDeliveries().items.length},icon:"glyphicon-star",currentPrice:500,productivity:40,items:[],buy:function(){var b=a.getDeliveries();a.buy(b)},sell:function(){var b=a.getDeliveries();a.sell(b)},calculateIncrement:function(){var b=a.getDeliveries();return a.calculateIncrement(b)}},this.labs={name:"labs",title:"Lab",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getLabs().items.length},icon:"glyphicon-star",currentPrice:600,productivity:100,items:[],buy:function(){var b=a.getLabs();a.buy(b)},sell:function(){var b=a.getLabs();a.sell(b)},calculateIncrement:function(){var b=a.getLabs();return a.calculateIncrement(b)}},this.portals={name:"portals",title:"Portal",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getPortals().items.length},icon:"glyphicon-star",currentPrice:700,productivity:6666,items:[],buy:function(){var b=a.getPortals();a.buy(b)},sell:function(){var b=a.getPortals();a.sell(b)},calculateIncrement:function(){var b=a.getPortals();return a.calculateIncrement(b)}},this.timeMachines={name:"timeMachines",title:"Time Machine",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam iaculis ut dui at gravida.",image:"http://placehold.it/100x100",quantity:function(){return a.getTimeMachines().items.length},icon:"glyphicon-star",currentPrice:800,productivity:9e4,items:[],buy:function(){var b=a.getTimeMachines();a.buy(b)},sell:function(){var b=a.getTimeMachines();a.sell(b)},calculateIncrement:function(){var b=a.getTimeMachines();return a.calculateIncrement(b)}},this.getCursors=function(){return this.cursors},this.getGrannies=function(){return this.grannies},this.getFarms=function(){return this.farms},this.getFactories=function(){return this.factories},this.getDeliveries=function(){return this.deliveries},this.getLabs=function(){return this.labs},this.getPortals=function(){return this.portals},this.getTimeMachines=function(){return this.timeMachines},this.getProducts=function(){return this.products},this.getProductByType=function(a){return this[a]},this.products=[this.getCursors(),this.getGrannies(),this.getFarms(),this.getFactories(),this.getDeliveries(),this.getLabs(),this.getPortals(),this.getTimeMachines()]});