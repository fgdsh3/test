const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
  .pipe(dest('dist/images'))
}

function css() {
  return src([
    'node_modules/animate.css/animate.css',
  ])
  .pipe(concat('_libs.scss'))
  .pipe(dest('app/scss'))
  .pipe(browserSync.reload({stream: true}))
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js',
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function styles() {
  return src([
    'app/scss/style.scss',
    'node_modules/slick-carousel/slick/slick.scss',
  ])
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true,
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/style.scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.css = css;

exports.build = series(cleanDist, images, build);
exports.default = parallel(css, scripts, browsersync, watching);

//let gulp = require('gulp'),
//  sass = require('gulp-sass'),
//  browserSync = require('browser-sync'),
//  uglify = require('gulp-uglify'),
//  concat = require('gulp-concat'),
//  rename = require('gulp-rename'),
//  del = require('del'),
//  autoprefixer = require('gulp-autoprefixer');
//
//
//gulp.task('clean', async function () {
//  del.sync('dist')
//})
//
//gulp.task('scss', function () {
//  return gulp.src('app/scss/**/*.scss')
//    .pipe(sass({ outputStyle: 'compressed' }))
//    .pipe(autoprefixer({
//      browsers: ['last 8 versions']
//    }))
//    .pipe(rename({ suffix: '.min' }))
//    .pipe(gulp.dest('app/css'))
//    .pipe(browserSync.reload({ stream: true }))
//});
//
//gulp.task('css', function () {
//  return gulp.src([
//    'node_modules/normalize.css/normalize.css',
//    'node_modules/slick-carousel/slick/slick.css',
//  ])
//    .pipe(concat('_libs.scss'))
//    .pipe(gulp.dest('app/scss'))
//    .pipe(browserSync.reload({ stream: true }))
//});
//
//gulp.task('html', function () {
//  return gulp.src('app/*.html')
//    .pipe(browserSync.reload({ stream: true }))
//});
//
//gulp.task('script', function () {
//  return gulp.src('app/js/*.js')
//    .pipe(browserSync.reload({ stream: true }))
//});
//
//gulp.task('js', function () {
//  return gulp.src([
//    'node_modules/slick-carousel/slick/slick.js'
//  ])
//    .pipe(concat('libs.min.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('app/js'))
//    .pipe(browserSync.reload({ stream: true }))
//});
//
//gulp.task('browser-sync', function () {
//  browserSync.init({
//    server: {
//      baseDir: "app/"
//    }
//  });
//});
//
//gulp.task('export', function () {
//  let buildHtml = gulp.src('app/**/*.html')
//    .pipe(gulp.dest('dist'));
//
//  let BuildCss = gulp.src('app/css/**/*.css')
//    .pipe(gulp.dest('dist/css'));
//
//  let BuildJs = gulp.src('app/js/**/*.js')
//    .pipe(gulp.dest('dist/js'));
//
//  let BuildFonts = gulp.src('app/fonts/**/*.*')
//    .pipe(gulp.dest('dist/fonts'));
//
//  let BuildImg = gulp.src('app/img/**/*.*')
//    .pipe(gulp.dest('dist/img'));
//});
//
//gulp.task('watch', function () {
//  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
//  gulp.watch('app/*.html', gulp.parallel('html'))
//  gulp.watch('app/js/*.js', gulp.parallel('script'))
//});
//
//gulp.task('build', gulp.series('clean', 'export'))
//
//gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));