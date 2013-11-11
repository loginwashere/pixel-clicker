define([
    'angular',
    'angular-mocks',
    'app'
], function(angular, mocks, app) {
    'use strict';

    describe('Controller: MainCtrl', function () {

        // load the controller's module
        beforeEach(module('app'));

        var MainCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });
        }));

        it('should attach app title and numberOfClicks to the scope', function () {
            expect(scope.game.getTitle()).toBe('Pixel Clicker');

            expect(scope.game.getNumberOfClicks()).toBe(0);
        });

        it('should increment numberOfClicks when click method called', function () {
            scope.clickPixel();
            expect(scope.numberOfClicks).toBe(1);
        });
    });
});
