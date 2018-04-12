var gulp = require('gulp');
var babel = require('gulp-babel');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('build'))
});

gulp.task('js', function() {
  return browserify('src/script/index.js')
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build/script'))
});

gulp.task('default', [ 'js', 'css', 'html' ]);

gulp.watch('src/**/*.js', ['js']);
gulp.watch('src/**/*.css', ['css']);
gulp.watch('src/**/*.html', ['html']);
