// list dependences
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

// create functions
function compilescss() {
  return src('sass/**/*.sass')
      .pipe(sass())
      .pipe(prefix('last 2 versions'))
      .pipe(minify())
    .pipe(dest('assets/css/'))
}

//optimize and move images
function optimizeimg() {
  return src('sass/img/*.{jpg,png}') // change to your source directory
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(dest('assets/img')) // change to your final/public directory
};

// webpimages
function webpImage() {
  return src('assets/img/*.{jpg,png}')
  .pipe(imagewebp())
  .pipe(dest('assets/img/'))
}

//optimize and move images
function webpImage() {
  return src('assets/img/*.{jpg,png}') // change to your source directory
    .pipe(imagewebp())
    .pipe(dest('assets/img')) // change to your final/public directory
};

// minify js
function jsmin(){
  return src('sass/js/*.js') // change to your source directory
    .pipe(terser())
    .pipe(dest('assets/js')); // change to your final/public directory
}

//watchtask
function watchTask(){
  watch('sass/**/*.sass', compilescss); // change to your source directory
  watch('sass/js/*.js', jsmin); // change to your source directory
  watch('sass/img/*', optimizeimg); // change to your source directory
  watch('assets/img/*.{jpg,png}', webpImage); // change to your source directory
}

// Default Gulp task 
exports.default = series(
  compilescss,
  jsmin,
  optimizeimg,
  webpImage,
  watchTask
);