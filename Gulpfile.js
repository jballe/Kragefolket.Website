'use strict';

var path = require('path');
var gulp = require('gulp');
var sync = require('gulp-sync')(gulp);

require(path.resolve('bld/gulp-tasks/composer.js'))(gulp);
require(path.resolve('bld/gulp-tasks/clean.js'))(gulp);
require(path.resolve('bld/gulp-tasks/localdeploy.js'))(gulp);
require(path.resolve('bld/gulp-tasks/template.js'))(gulp, process);
require(path.resolve('bld/gulp-tasks/ftpdeploy.js'))(gulp);
require(path.resolve('bld/gulp-tasks/watch.js'))(gulp);

gulp.task('default', ['build']);
gulp.task('build', ['localdeploy']);
gulp.task('rebuild', sync.sync(['clean', 'build']));
gulp.task('deploy', ['ftpdeploy']);
gulp.task('watch', ['dowatch']);

gulp.task('update', ['composer-update']);
gulp.task('getup',  ['composer-install']);
