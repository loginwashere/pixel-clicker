define([], function() {
    'use strict';

    describe('Controller: ShopCtrl', function () {

        // load the controller's module
        beforeEach(module('app'));

        var ShopCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ShopCtrl = $controller('ShopCtrl', {
                $scope: scope
            });
        }));

        it('should attach content to the scope', function () {
            expect(scope.content).toBe('Shop');
        });
    });
});
