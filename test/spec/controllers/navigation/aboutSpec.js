define([
    'angular',
    'angular-mocks',
    'app'
], function(angular, mocks, app) {
    'use strict';

    describe('Controller: AboutCtrl', function () {

        // load the controller's module
        beforeEach(module('app'));

        var AboutCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            AboutCtrl = $controller('AboutCtrl', {
                $scope: scope
            });
        }));

        it('should attach content to the scope', function () {
            expect(scope.content).toBe('About');
        });
    });
});
