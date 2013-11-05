define([
    'angular',
    './controllers/index',
    './services/index',
    'ui.bootstrap'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'ui.bootstrap'
    ]);
});
