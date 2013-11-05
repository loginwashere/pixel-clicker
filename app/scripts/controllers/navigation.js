define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('NavigationCtrl', ['$scope', function ($scope) {
        $scope.tabs = [
            {title: 'Shop', content: 'views/navigation/shop.html'},
            {title: 'Menu', content: 'views/navigation/menu.html'},
            {title: 'Stats', content: 'views/navigation/stats.html'},
            {title: 'Updates', content: 'views/navigation/updates.html'},
            {title: 'About', content: 'views/navigation/about.html'}
        ];

        $scope.navType = 'pills';
    }]);
});