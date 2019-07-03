const gulp         = require('gulp');
const plumber      = require('gulp-plumber'); // It's a me, gulp! Streamlines handling of tasks
const sass         = require('gulp-sass'); // Gulp pluign for Sass compilation.
const postcss      = require('gulp-postcss'); // PostCSS for managing SCSS plugins
const cssnano      = require('cssnano'); // Minifies CSS files.
const autoprefixer = require('autoprefixer'); // Autoprefixing magic.
const sourcemaps   = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
const notify       = require('gulp-notify'); // Sends message notification to you

/**
 * Error display
 */
const onError = function(err) {
    notify.onError({
        message: '<%= error.message %>',
        sound: 'Beep'
    })(err);

    this.emit('end');
};

// Autoprefix browser config
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];

/**
 * Task: `styles`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates style.css
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 */
gulp.task('style', function () {
    let plugins = [
        autoprefixer(AUTOPREFIXER_BROWSERS),
        cssnano()
    ];

    return gulp.src('./assets/src/css/style.scss')
        .pipe( plumber({ errorHandler: onError }) )
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'compact',
            precision: 10
        }) )
        .pipe( postcss(plugins) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('./assets/dist/css/') )
        .pipe( notify({ message: 'styles completed', onLast: true, timeout: 5 }) )
});

/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task('watch', function () {
    gulp.watch( './assets/src/css/**/*.scss', 'style');
});