var gulp = require('gulp');

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['sass', 'fonts', 'index', 'html', 'webpack', 'watch', 'build:dev', 'serve']);
