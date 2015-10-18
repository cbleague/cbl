var gulp = require('gulp');
var config = require('../config').server;
var server = require('gulp-webserver');

gulp.task('serve', function() {
  console.log(config.src);

  gulp.src(config.src)
    .pipe(server({
      livereload: config.livereload,
      directoryListing: config.directoryListing,
      open: config.open,
      port: config.port
    }));
});
