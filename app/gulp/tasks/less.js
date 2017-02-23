'use strict';

var less = require('gulp-less');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var debug = require('gulp-debug');



module.exports = function(gulp, options) {
  var config = require('../config')[options.key || 'less'];

  return task;

  function task() {
    return gulp.src(config.src)
      .pipe(less(config.options).on('error', options.onError))
      .pipe(autoprefixer(config.autoprefixer))
      .pipe(rename(config.output))
      .pipe(gulp.dest(config.build));  }
};
