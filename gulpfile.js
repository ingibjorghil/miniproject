const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

gulp.task('serve', ['build-css'], function() {
	browserSync.init({
		server: "./",
		ui: {
    		port: 8080
		}
	});
	gulp.watch('assets/scss/**/*.scss', ['build-css']);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('minify-js', function() {
	return gulp.src('assets/js/*.js')
	.pipe(sourcemaps.uglify())
	.pipe(gulp.dest('assets/scripts'));
});

gulp.task('build-css', function() {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);