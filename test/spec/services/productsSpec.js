define([
    'angular',
    'angular-mocks',
    'app'
], function (angular, mocks, app) {
    'use strict';

    describe('Service: products', function () {

        // load the service's module
        beforeEach(module('app'));

        // instantiate service
        var products;
        beforeEach(inject(function (_products_) {
            products = _products_;
        }));

        it('should do something', function () {
            expect(!!products).toBe(true);
        });

    });
});
