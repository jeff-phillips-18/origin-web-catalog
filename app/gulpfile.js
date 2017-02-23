'use strict';

var args = require('yargs').argv;
var gulp = require('gulp');
var debug = require('gulp-debug');
var merge = require('merge');
var taskListing = require('gulp-task-listing');
var browserSync = require('browser-sync');
var log = require('gulp-util').log;

/**
 * List the available gulp tasks
 */
gulp.task('help', taskListing);
gulp.task('default', ['help']);

/**
 * Check the code for errors
 */
gulp.task('eslint', task('eslint'));
gulp.task('lesshint', task('lesshint'));
gulp.task('vet', ['eslint', 'lesshint']);

/**
 * Cleans the build output
 */
gulp.task('clean', task('clean'));
gulp.task('clean-styles', task('clean', {key: 'cleanStyles'}));
gulp.task('clean-fonts', task('clean', {key: 'cleanFonts'}));
gulp.task('clean-images', task('clean', {key: 'cleanImages'}));
gulp.task('clean-code', task('clean', {key: 'cleanCode'}));

/**
 * Individual component build tasks
 */
gulp.task('templatecache', task('templatecache'));
gulp.task('less', task('less'));
gulp.task('tsc', task('tsc'));
gulp.task('wiredep', task('wiredep'));
gulp.task('fonts', task('fonts'));
gulp.task('images', task('images'));
gulp.task('imgs', ['images'], task('images', {key: 'imgs'}));
gulp.task('dev-fonts', task('fonts', {key: 'devFonts'}));
gulp.task('dev-images', task('images', {key: 'devImages'}));
gulp.task('dev-imgs', task('images', {key: 'devImgs'}));

/**
 * Build tasks
 */
gulp.task('inject', ['wiredep', 'less', 'templatecache'], task('inject'));
gulp.task('compileTs', task('tsc'));
gulp.task('build', ['compileTs', 'wiredep', 'images', 'imgs', 'fonts'], task('build'));

/**
 * Serves up injected html for dev, builds for everything else.
 */
gulp.task('serve', task('serve', {
  specRunner: false
}));

function errorHandler(error) {
  browserSync.notify(error.message, 3000);
  log('[Error!] ' + error.toString());
  if (process.argv.indexOf('--fail') !== -1) {
    process.exit(1);
  }
}

function argOptions() {
  return {
    rev: !!(args.rev || args.production),
    minify: !!(args.minify || args.production),
    production: !!args.production,
    verbose: !!(args.verbose || args.v),
    startServer: !!args.startServer,
    debug: !!(args.debug || args.debugBrk),
    debugBrk: !!args.debugBrk,
    nosync: !!args.nosync,
    type: args.type,
    version: args.version
  };
}

function task(taskName, options) {
  var actualErrorHandler;

  if (typeof options !== 'object') {
    options = {};
  }

  if (typeof options.onError !== 'function') {
    options.onError = errorHandler;
  }
  actualErrorHandler = options.onError;
  options.onError = function() {
    actualErrorHandler.apply(this, arguments);
    this.emit('end');
  };

  return require('./gulp/tasks/' + taskName)(gulp, merge(argOptions(), options));
}

