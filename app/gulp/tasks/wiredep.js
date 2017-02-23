'use strict';

var wiredep = require('wiredep').stream;
var log = require('../utils/log');
var copy = require('gulp-copy');
var debug = require('gulp-debug');

module.exports = function(gulp, options) {
  var config = require('../config')[options.key || 'wiredep'];

  return task;

  function task() {
    if (options.verbose) {
      log('Wiring the bower dependencies into the html');
      log(config.index)
    }

    gulp.src(config.index)
      .pipe(debug())
      .pipe(copy(config.build, config.copyOptions));

    return gulp.src(config.templates)
      .pipe(wiredep(config.options))
      .pipe(gulp.dest(config.build));
  }
};
