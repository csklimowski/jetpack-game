var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
 
gulp.task('build', function() {
	gulp.src('./src/**/*.js')
		.pipe(rollup({
	  		entry: './src/jetpack.js',
			format: 'iife',
			moduleName: 'jetpack'
		}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(connect.reload());
});

gulp.task('serve', function() {
	connect.server({
		root: '.',
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(['./src/**'], ['build']);
})

gulp.task('default', ['build', 'serve', 'watch']);