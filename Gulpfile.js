var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    tinylr,
    cssPath = 'css/',
    sassPath = 'sass/';

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname));
  app.listen(4000);
});

gulp.task('styles', function() {
  // uncomment on production
  return sass(sassPath)
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest(cssPath))
    // .pipe(rename({suffix: '.min'}))
    // .pipe(minifycss())
    // .pipe(gulp.dest(cssPath));
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
  gulp.watch(sassPath + '**', ['styles']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch(cssPath + '*', notifyLiveReload);
});

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});

gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

});


