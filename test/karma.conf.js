'use strict';

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        //
        browsers: ['IE', 'Chrome'],
        // browsers: ['IE'],
        // browsers: ['Chrome'],

        // frameworks to use (available frameworks: https://npmjs.org/browse/keyword/karma-adapter)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // load files to be tested
            './lib/Gradiate.js',

            // load all test files
            './test/**/*.js',
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './lib/Gradiate.js': 'coverage'
        },

        // test results reporter to use, possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'html', 'coverage'],

        coverageReporter: {
            dir: 'test/karma.coverage/'
        },

        // htmlReporter plugin configuration
        htmlReporter: {
            outputDir: 'test/karma.results/', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: false, // reports show failures on start
            namedFiles: true, // name files instead of creating sub-directories
            // pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            // reportName: 'karma.results', // report summary filename; browser info by default
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false, // reports start folded (only with preserveDescribeNesting)
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        client: {
            captureConsole: true
        },

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        singleRun: true,
    });
};
