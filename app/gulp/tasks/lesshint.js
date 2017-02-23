'use strict';

var lesshint = require('gulp-lesshint');
var log = require('../utils/log');

module.exports = function(gulp, options) {
  var config = require('../config')[options.key || 'lesslint'];

  return task;

  function task() {
    if (options.verbose) {
      log('Running lesshint');
    }

    return gulp.src(config.src)
      .pipe(lesshint())
      .pipe(lesshint.format())
      .pipe(lesshint.failOnError());
  }
};
