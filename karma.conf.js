// Karma configuration
// Generated on Wed May 28 2025 19:15:55 GMT-0400 (Eastern Daylight Time)

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine',
      '@angular-devkit/build-angular',
    ],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
      '@angular-devkit/build-angular/plugins/karma',
    ],
    client: {
      jasmine: {
        random: false,
      },
      clearContext: config.singleRun,
    },
    files: [
      {
        pattern: 'src/**/*.ts',
        type: 'js',
      },
    ],
    exclude: [],
    preprocessors: {},
    reporters: [
      'progress',
      'kjhtml',
      'coverage-istanbul',
    ],
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/app'),
      reports: [
        'html',
        'lcovonly',
        'text-summary',
      ],
      fixWebpackSourcePaths: true,
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80,
        },
        // thresholds per file
        each: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80,
        },
      },
      verbose: true, // output config used by istanbul for debugging
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: false,
  });
};
