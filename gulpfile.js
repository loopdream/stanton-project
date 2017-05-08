const gulp         = require('gulp');
const $            = require('gulp-load-plugins')();
const runSequence  = require('run-sequence');
const fs           = require('fs');
const browserify   = require('browserify');
const del          = require('del');
const lazypipe     = require('lazypipe');
const argv         = require('yargs').argv;
const buffer       = require('vinyl-buffer');
const babelify     = require('babelify');
const source       = require('vinyl-source-stream');


var config = {
  defaultPort: 3000,
  supportedBrowsers: [
    'ie >= 10',
    'last 1 Firefox versions',
    'last 1 Chrome versions',
    'Safari >= 7',
    'iOS > 7',
    'ChromeAndroid >= 4.2'
  ],
  version: require('./package.json').version,
  minify: argv.minify || false,
  environment: argv.environment || 'local',
};

// Clean site directory
gulp.task('clean', del.bind(null, ['client/styles/'], {dot: true}));

var cssFinish = lazypipe()
  .pipe(gulp.dest, 'client/styles')
  .pipe(function () {
    return $.if(config.minify, $.cleanCss());
  })
  .pipe(function () {
    return $.if(config.minify, $.rename({suffix: '.min'}));
  })
  .pipe(function () {
    return $.if(config.minify, gulp.dest('client/styles'));
  })

gulp.task('sass', function () {
  return gulp.src(['client/sass/main.scss'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: config.supportedBrowsers}))
    .pipe($.concat('styles.css'))
    .pipe(cssFinish());
});


var scriptsFinish = lazypipe()
  .pipe(gulp.dest, 'client/scripts')
  .pipe(buffer)
  .pipe(function () {
    return $.if(config.minify, $.uglify());
  })
  .pipe(function () {
    return $.if(config.minify, $.rename({suffix: '.min'}));
  })
  .pipe(function () {
    return $.if(config.minify, gulp.dest('client/scripts'));
  });
  // .pipe(function () {
  //   return $.if(browserSync.active, browserSync.stream());
  // });

// Lint and build scripts
gulp.task('scripts', function() {
  return browserify('client/scripts/index.js')
    .transform(babelify.configure({
        presets: ['es2015']
    })).bundle()
    .pipe(source('app.js'))
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    // .pipe($.if(config.isWatching, $.jshint()))
    // .pipe($.if(config.isWatching, $.jshint.reporter('jshint-stylish')))
    // .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe(scriptsFinish());
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence(
    'sass',
    'scripts',
    // 'images',
    // 'svg'
    cb);
});