define([
    'angular',
    'angular-mocks',
    'app'
], function(angular, mocks, app) {
    'use strict';

    describe('Service: game', function () {

      // load the service's module
      beforeEach(module('app'));

      // instantiate service
      var game;
      beforeEach(inject(function(_game_) {
        game = _game_;
      }));

      it('should do something', function () {
        expect(!!game).toBe(true);
      });

    });
});
