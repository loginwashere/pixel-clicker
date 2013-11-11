(function (window, require) {
    'use strict';
    var file, requireModules;
    requireModules = [];

    for (file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (file.substring(file.length - 7, file.length) === 'Spec.js') {
                console.log('Added file to testing..');
                requireModules.push(file);
            }
        }
    }

    requireModules.push('app');
    //requireModules.push('mocks');

    require({
        baseUrl: '/base/app/scripts',

        paths: {
            'angular'         : '../bower_components/angular/angular',
            'angular-mocks'   : '../bower_components/angular-mocks/angular-mocks',
            'angular-resource': '../bower_components/angular-resource/angular-resource',
            'angular-scenario': '../bower_components/angular-scenario/angular-scenario',
            'domReady': '../bower_components/requirejs-domready/domReady',
            'jquery': '../bower_components/jquery/jquery',
            'masonry': '../bower_components/masonry/masonry',
            'lodash': '../bower_components/lodash/dist/lodash',
            'doc-ready/doc-ready': '../bower_components/doc-ready/doc-ready',
            'get-style-property/get-style-property': '../bower_components/get-style-property/get-style-property',
            'matches-selector/matches-selector': '../bower_components/matches-selector/matches-selector',
            'outlayer/item': '../bower_components/outlayer/item',
            'outlayer/outlayer': '../bower_components/outlayer/outlayer',
            'get-size/get-size': '../bower_components/get-size/get-size',
            'eventie/eventie': '../bower_components/eventie/eventie',
            'eventEmitter/EventEmitter': '../bower_components/eventEmitter/EventEmitter',
            'imagesLoaded': '../bower_components/imagesloaded/imagesloaded',
            'ui.bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls'
        },

        shim: {
            'angular'         : {
                exports: 'angular'
            },
            'angular-mocks'   : {
                deps: ['angular']
            },
            'angular-resource': {
                deps: ['angular']
            },
            'ui.bootstrap': {
                deps: ['angular']
            }
        }
    }, requireModules, function () {
        window.__karma__.start();
    }, function (err) {
        var failedModules = err.requireModules;
        console.log("err", err);

        if (failedModules && failedModules[0]) {
            throw new Error("Module could not be loaded: " + failedModules);
        } else {
            throw new Error("unknown error:" + err);
        }
    });
}(window, require));