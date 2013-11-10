define([], function() {
    'use strict';

    describe('Controller: StatsCtrl', function () {

        // load the controller's module
        beforeEach(module('app'));

        var StatsCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            StatsCtrl = $controller('StatsCtrl', {
                $scope: scope
            });
        }));

        it('should attach content to the scope', function () {
            expect(scope.content).toBe('Stats');
        });
    });
});
