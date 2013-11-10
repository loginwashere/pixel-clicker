/**
 * another one monkey patch to prevent "no timestamp" error
 * https://github.com/karma-runner/karma-requirejs/issues/6#issuecomment-23037725
 */
(function (global) {
    var fileWithoutLeadingSlash;
    // array where all spec files will be included
    global.tests = [];

    for (var file in global.__karma__.files) {
        if (global.__karma__.files.hasOwnProperty(file)) {
            // get rid of leading slash in file path - prevents "no timestamp" error
            fileWithoutLeadingSlash = file.replace(/^\//, '');
            global.__karma__.files[fileWithoutLeadingSlash] = global.__karma__.files[file];
            delete global.__karma__.files[file];

            // we get all the test files automatically and store to window.tests array
            if (/Spec\.js$/.test(fileWithoutLeadingSlash)) {
                global.tests.push(fileWithoutLeadingSlash);
            }
        }
    }
})(this);

require.config({
    baseUrl: '../app',

    paths: {
        'angular'         : '../app/bower_components/angular/angular',
        'angular-mocks'   : '../app/bower_components/angular-mocks/angular-mocks',
        'angular-resource': '../app/bower_components/angular-resource/angular-resource',
        'angular-scenario': '../app/bower_components/angular-scenario/angular-scenario',
        'domReady'        : '../app/bower_components/requirejs-domready/domReady',
        'Source'          : '../app/scripts'
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
        }
    },

    // array with all spec files
    deps: window.tests,

    callback: window.__karma__.start
});