const gulp         = require('gulp');
const $            = require('gulp-load-plugins')();
const runSequence  = require('run-sequence');
const fs           = require('fs');
const browserify   = require('browserify');
const del          = require('del');
const lazypipe     = require('lazypipe');
const argv         = require('yargs').argv;


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
gulp.task('clean', del.bind(null, ['src/styles/'], {dot: true}));

var cssFinish = lazypipe()
  .pipe(gulp.dest, 'src/styles')
  .pipe(function () {
    return $.if(config.minify, $.cleanCss());
  })
  .pipe(function () {
    return $.if(config.minify, $.rename({suffix: '.min'}));
  })
  .pipe(function () {
    return $.if(config.minify, gulp.dest('src/styles'));
  })

gulp.task('sass', function () {
  return gulp.src(['src/sass/main.scss'])
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: config.supportedBrowsers}))
    .pipe($.concat('styles.css'))
    .pipe(cssFinish());
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence(
    'sass',
    // 'scripts',
    // 'images',
    // 'svg'
    cb);
});