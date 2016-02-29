var gulp = require('gulp'),
    bower = require('gulp-bower'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,

    clean = require('del'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),

    stylus = require('gulp-stylus'),
    axis = require('axis'),
    prefix = require('gulp-autoprefixer'),

    uglify = require('gulp-uglify'),
    imagemin = require('imagemin');

var cssPath = function () {
    return argv.prod ? 'client_build/css' : 'client_src/css';
};

var jsPath = function () {
    return argv.prod ? 'client_build/js' : 'client_src/js';
};

gulp.task('default', ['libs', 'build']);
gulp.task('build', ['copy-static', 'css']);
gulp.task('copy-static', ['image', 'html']);


gulp.task('bower', function () {
    return bower();
});

gulp.task('libs', function () {
    return gulp.src('client_src/libs/**/*.*')
        .pipe(gulp.dest('client_build/libs'));
});

gulp.task('html', function () {
    gulp.src('client_src/*.html')
        .pipe(gulp.dest('client_build'));
});

gulp.task('css', function () {
    gulp.src('client_src/styl/main.styl')
        .pipe(stylus({
            use: [axis()],
            compress: argv.prod
        }))
        .pipe(prefix('last 2 versions', 'ie 9'))
        .pipe(rename('main.css'))
        .pipe(gulpif(argv.prod, rename('main.min.css')))
        .pipe(gulp.dest(cssPath()));
});

gulp.task('js', function () {
    gulp.src(['client_src/js/*.js', '!main.js'])
        .pipe(concat('main.js'))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulpif(argv.prod, rename('main.min.js')))
        .pipe(gulp.dest(jsPath()));
});

gulp.task('watch', function() {
    gulp.watch('client_src/styl/*.styl', ['css']);
    gulp.watch('client_src/js/*.js', ['js']);
});

gulp.task('clean', function () {
    return clean('client_build');
});
