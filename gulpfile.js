var gulp = require('gulp');
var less = require('gulp-less');
var shell = require('gulp-shell');
var watchLess = require('gulp-watch-less');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var csswring = require('csswring');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

gulp.task('default', ['less','js','browser-sync'], function () {
	gulp.watch('./src/less/**/*.less', ['less']);
	gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		proxy: "http://localhost:8080/techtalk/public",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 8000,
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		/*script: 'bin/www',*/
    env: {
        'NODE_ENV':"development",
		'APP_DOMAIN': "http://localhost:7000"
      }
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('less', function() {
    return gulp.src('./src/less/app.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([csswring]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
	return gulp.src('./src/js/app.js')
		.pipe(browserify({
			insertGlobals : true,
		  	debug : !'production'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});
