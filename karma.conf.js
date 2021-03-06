// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'app/bower_components/angular/angular.js', included: false},
            {pattern: 'app/bower_components/angular-mocks/angular-mocks.js', included: false},
            {pattern: 'app/bower_components/angular-resource/angular-resource.js', included: false},
            {pattern: 'app/bower_components/angular-scenario/angular-scenario.js', included: false},
            {pattern: 'app/bower_components/requirejs-domready/domReady.js', included: false},
            {pattern: 'app/bower_components/jquery/jquery.js', included: false},
            {pattern: 'app/bower_components/masonry/masonry.js', included: false},
            {pattern: 'app/bower_components/lodash/dist/lodash.js', included: false},
            {pattern: 'app/bower_components/doc-ready/doc-ready.js', included: false},
            {pattern: 'app/bower_components/get-style-property/get-style-property.js', included: false},
            {pattern: 'app/bower_components/matches-selector/matches-selector.js', included: false},
            {pattern: 'app/bower_components/outlayer/item.js', included: false},
            {pattern: 'app/bower_components/outlayer/outlayer.js', included: false},
            {pattern: 'app/bower_components/get-size/get-size.js', included: false},
            {pattern: 'app/bower_components/eventie/eventie.js', included: false},
            {pattern: 'app/bower_components/eventEmitter/EventEmitter.js', included: false},
            {pattern: 'app/bower_components/imagesloaded/imagesloaded.js', included: false},
            {pattern: 'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js', included: false},
            {pattern: 'app/bower_components/store.js/store.js', included: false},
            {pattern: 'test/mock/**/*.js', included: false},
            {pattern: 'test/spec/**/*.js', included: false},
            {pattern: 'app/scripts/**/*.js', included: false},
            'test/tests-main.js'
        ],

        // list of files / patterns to exclude
        exclude: [ 'app/scripts/main.js' ],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS', 'Firefox'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
