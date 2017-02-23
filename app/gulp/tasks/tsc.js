'use strict';

var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var filter = require('gulp-filter');
var concatFilenames = require("gulp-concat-filenames");
var eventStream = require('event-stream');
var debug = require('gulp-debug');


module.exports = function(gulp, options) {
  var config = require('../config')[options.key || 'tsc'];

  return task;

  function task () {
    var cwd = process.cwd();

    var tsLibResult = gulp.src(config.tsLib)
      .pipe(sourcemaps.init())
      .pipe(typescript(config.tsLibProject))
      .on('error', notify.onError({
        onLast: true,
        message: '\\<%= error.message %\\>',
        title: 'Typescript compilation error'
      }))
      .on('error', function (error) {
        argv._.forEach(function (arg) {
          if (arg === 'build') {
            throw "Compilation error, halting build";
          }
        });
      });

    eventStream.merge(
      tsLibResult.js
        .pipe(concat('origin-web-catalog.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build)),
      tsLibResult.dts
        .pipe(gulp.dest('lib_d.ts'))
        .pipe(filter('**/*.d.ts'))
        .pipe(concatFilenames('lib_defs.d.ts', {
          root: cwd,
          prepend: '/// <reference path="',
          append: '"/>'
        }))
        .pipe(gulp.dest(config.build))
    );

    var tsResult = gulp.src(config.ts)
      .pipe(sourcemaps.init())
      .pipe(typescript(config.tsProject))
      .on('error', notify.onError({
        onLast: true,
        message: '\\<%= error.message %\\>',
        title: 'Typescript compilation error'
      }))
      .on('error', function (error) {
        argv._.forEach(function (arg) {
          if (arg === 'build') {
            throw "Compilation error, halting build";
          }
        });
      });

    return eventStream.merge(
      tsResult.js
        .pipe(concat('catalogApp.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build)),
      tsResult.dts
        .pipe(gulp.dest('d.ts'))
        .pipe(filter('**/*.d.ts'))
        .pipe(concatFilenames('defs.d.ts', {
          root: cwd,
          prepend: '/// <reference path="',
          append: '"/>'
        }))
      .pipe(gulp.dest(config.build))
    );
  }
};
