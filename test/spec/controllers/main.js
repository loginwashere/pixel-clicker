'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

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
        expect(scope.title).toBeDefined();
        expect(scope.title).toBe('Pixel Clicker');

        expect(scope.numberOfClicks).toBeDefined();
        expect(scope.numberOfClicks).toBe(0);
    });

    it('should increment numberOfClicks when click method called', function () {
        scope.click();
        expect(scope.numberOfClicks).toBe(1);
    });
});
