var gulp = require('gulp');
var babel = require('gulp-babel');
// var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
// var babelify = require('babelify');

// var sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    // .pipe(pug())
    .pipe(gulp.dest('build'))
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    // .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build'))
});

gulp.task('js', function() {
  return browserify('src/script/index.js')
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    // gulp.src('src/**/*.js')
    // .pipe(sourcemaps.init())
    // .pipe(babel({
    //     presets: ['env']
    // }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/script'))
});

gulp.task('default', [ 'js', 'css', 'html' ]);

var watch_js = gulp.watch('src/**/*.js', ['js']);
var watch_css = gulp.watch('src/**/*.css', ['css']);
var watch_html = gulp.watch('src/**/*.html', ['html']);

// gulp.task('watch', [ 'js' ]);