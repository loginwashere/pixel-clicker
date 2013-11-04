'use strict';

angular.module('clientApp', ['ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/pixel-clicker', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/pixel-clicker'
            });
        $locationProvider.html5Mode(true);
    }]);
