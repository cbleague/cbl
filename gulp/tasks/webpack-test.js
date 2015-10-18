var gulp = require('gulp');
var webpack = require('webpack-stream');
//var Karma = require('karma').Server;

gulp.task('webpack:test', function() {
  return gulp.src('./test/client/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client'));
});