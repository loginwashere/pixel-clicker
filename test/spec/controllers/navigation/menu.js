'use strict';

describe('Controller: MenuCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var MenuCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MenuCtrl = $controller('MenuCtrl', {
            $scope: scope
        });
    }));

    it('should attach content to the scope', function () {
        expect(scope.content).toBe('Menu');
    });
});
