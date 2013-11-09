define([
    'angular',
    './controllers/index',
    './services/index',
    './directives/index',
    'ui.bootstrap'
], function (ng) {
    'use strict';

    return ng.module('app', [
        'app.services',
        'app.controllers',
        'app.directives',
        'ui.bootstrap'
    ]);
});
