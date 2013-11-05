require.config({

    // alias libraries paths
    paths: {
        'domReady': '../bower_components/requirejs-domready/domReady',
        'angular': '../bower_components/angular/angular',
        'jquery': '../bower_components/jquery/jquery',
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