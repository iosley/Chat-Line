var gulp       = require('gulp');
var minifyHTML = require('gulp-minify-html');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var minifyCss  = require('gulp-minify-css');
var sass       = require('gulp-sass')
var notify     = require('gulp-notify');


gulp.task('minify-js', function() {
  gulp.src('./client/src/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/js/'))
    .pipe(notify('Done: minify-js'));
});

gulp.task('minify-vendor-js', function() {
  gulp.src([
    './client/src/vendor/**/*.js',
    '!./client/src/vendor/angular/angular.js',
    '!./client/src/vendor/bootstrap/bootstrap.js',
    '!./client/src/vendor/jquery/jquery.js',
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/vendor/'))
    .pipe(notify('Done: minify-vendor-js'));

  gulp.src('./client/src/vendor/angular/angular.js')
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/vendor/'))
    .pipe(notify('Done: angular-js'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true
  };
  gulp.src('./client/src/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./client/dist/'))
    .pipe(notify('Done: minify-html'));
  gulp.src('./client/src/partials/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./client/dist/partials/'))
    .pipe(notify('Done: minify-partials-html'));
});

gulp.task('minify-vendor-css', function() {
  gulp.src([
   './client/src/vendor/**/*.css',
   './client/src/scss/bootstrap.css',
   '!./bower_components/bootstrap/dist/css/bootstrap-theme.css'
  ])
    .pipe(concat('vendor.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./client/dist/vendor/'))
    .pipe(notify('Done: minify-vendor-css'));
});

gulp.task('minify-css', function() {
  gulp.src([
    './client/src/scss/**/*.css',
    '!./client/src/scss/bootstrap.css'
  ])
    .pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./client/dist/css/'))
    .pipe(notify('Done: minify-css'));
});

gulp.task('fonts', function() {
  gulp.src('./client/src/fonts/*')
    .pipe(gulp.dest('./client/dist/fonts/'))
    .pipe(notify('Tasks de fonts finalizadas.'));
});


gulp.task('chat', ['minify-html', 'minify-js', 'minify-vendor-js', 'minify-vendor-css', 'minify-css', 'fonts']);

gulp.task('default', ['chat']);

gulp.task('watch', function() {
  gulp.watch([
    './client/src/*.html',
    './client/src/partials/**/*.html'
  ], ['minify-html']);
  gulp.watch('./client/src/js/**/*.js', ['minify-js']);
  gulp.watch('./client/src/js/**/*.js', ['minify-js']);
  gulp.watch([
    './client/src/vendor/**/*.js',
    '!./client/src/vendor/angular/angular.js',
    '!./client/src/vendor/bootstrap/bootstrap.js',
    '!./client/src/vendor/jquery/jquery.js',
  ], ['minify-vendor-js']);
  gulp.watch([
   './client/src/vendor/**/*.css',
   './client/src/scss/bootstrap.css',
   '!./bower_components/bootstrap/dist/css/bootstrap-theme.css'
  ], ['minify-vendor-css']);
  gulp.watch([
    './client/src/scss/**/*.css',
    '!./client/src/scss/bootstrap.css'
  ], ['minify-css']);
});