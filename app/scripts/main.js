require.config({

    // alias libraries paths
    paths: {
        'domReady': '../bower_components/requirejs-domready/domReady',
        'angular': '../bower_components/angular/angular',
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
        'ui.bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'store': '../bower_components/store/store'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui.bootstrap': {
            deps: ['angular']
        }
    },

    // kick start application
    deps: ['./bootstrap']
});