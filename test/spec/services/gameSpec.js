define([
    'angular',
    'angular-mocks',
    'app'
], function (angular, mocks, app) {
    'use strict';

    describe('Service: game', function () {

        // load the service's module
        beforeEach(module('app'));

        // instantiate service
        var game;
        beforeEach(inject(function (_game_) {
            game = _game_;
        }));

        it('should do something', function () {
            expect(!!game).toBe(true);
        });

        it('should return game title', function () {
            expect(game.getTitle()).toBe('Pixel Clicker');
        });

        it('should return number of clicks', function () {
            expect(game.getNumberOfClicks()).toBe(0);
        });

        it('should return bigger number of clicks after click', function () {
            var scope = {};
            game.clickPixel(scope)();
            expect(game.getNumberOfClicks()).toBe(1);
        });

        it('should have products', function () {
            expect(game.getProducts().length).toBe(8);
        });
    });
});
