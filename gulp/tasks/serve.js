var gulp = require('gulp');
var config = require('../config').server;
// var server = require('gulp-webserver');
//var exec = require('child_process').exec;
var run = require("gulp-run");

gulp.task('serve', function() {
    run("node ./src/server.js").exec();
	// exec("node ./src/server.js", function(err, stdout, stderr) {
	// 	console.log(stdout);
	// 	console.log(stderr);
	// 	cb(err);
	// });

	// gulp.src(config.src)
	// .pipe(server({
	// livereload: config.livereload,
	// directoryListing: config.directoryListing,
	// open: config.open,
	// port: config.port
	// }));
});
