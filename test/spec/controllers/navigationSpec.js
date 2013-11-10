define([], function() {
    'use strict';

    describe('Controller: NavigationCtrl', function () {

        // load the controller's module
        beforeEach(module('app'));

        var NavigationCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            NavigationCtrl = $controller('NavigationCtrl', {
                $scope: scope
            });
        }));

        it('should attach a list of tabs and navType to the scope', function () {
            expect(typeof scope.tabs).toBeDefined();
            expect(scope.tabs.length).toBe(5);
            expect(scope.navType).toBe('pills');
        });
    });
});