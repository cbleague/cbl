var gulp = require('gulp');
var webpack = require('webpack-stream');
//var Karma = require('karma').Server;

gulp.task('staticfiles:dev', function() {
  return gulp.src(['./app/**/*.html', './app/**/*.css'])
    .pipe(gulp.dest('build/'));
});