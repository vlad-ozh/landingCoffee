const { src, dest, watch, parallel, series } = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

const scripts = () => {
  return src([
    'node_modules/aos/build/aos.js',
    'node_modules/jquery/build/jquery.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

const styles = () => {
  return src('app/scss/styles.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
          overrideBrowserslist: ['last 10 version'],
          grid: true,
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

const images = () => {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('build/images'))
}

const cleanBuild = () => {
  return del('build')
}

const build = () => {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('build'))
}

const watching = () => {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanBuild = cleanBuild;

exports.build = series(cleanBuild, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);