var gulp = require('gulp');
var rollup = require('gulp-rollup');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
 
function build() {
	return gulp.src('./src/**/*.js')
		.pipe(rollup({
	  		input: './src/jetpack.js',
			format: 'iife',
			name: 'jetpack'
		}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
}

function bundle() {
	return gulp.src('./src/**/*.js')
		.pipe(rollup({
	  		input: './src/jetpack.js',
			format: 'iife',
			name: 'jetpack'
		}))
		.pipe(gulp.dest('js'))
		.pipe(connect.reload());
};

function serve() {
	return connect.server({
		root: '.',
		livereload: true
	});
};


function watch() {
	return gulp.watch('./src/**', bundle);
};


function develop() {
	return gulp.series(bundle, serve, watch);
}


exports.bundle = bundle;
exports.build = build;
exports.default = gulp.series(bundle, serve, watch);
