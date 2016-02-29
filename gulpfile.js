var gulp = require('gulp'),
    bower = require('gulp-bower'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,

    clean = require('del'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),

    stylus = require('gulp-stylus'),
    axis = require('axis'),
    prefix = require('gulp-autoprefixer'),

    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    htmlhint = require('gulp-htmlhint'),
    sourcemaps = require('gulp-sourcemaps');

var cssPath = function () {
    return argv.prod ? 'client_build/css' : 'client_src/css';
};

var jsPath = function () {
    return argv.prod ? 'client_build/js' : 'client_src/js';
};

gulp.task('default', ['libs', 'build']);
gulp.task('build', ['copy-static', 'css', 'js']);
gulp.task('copy-static', ['image', 'html']);
gulp.task('style', ['style:js', 'style:html']);


gulp.task('bower', function () {
    return bower();
});

gulp.task('libs', function () {
    return gulp.src('client_src/libs/**/*.*')
        .pipe(gulp.dest('client_build/libs'));
});

gulp.task('html', function () {
    gulp.src('client_src/*.html')
        .pipe(gulpif(argv.prod, htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            removeTagWhitespace: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(gulp.dest('client_build'))
        .pipe(livereload());
});

gulp.task('css', function () {
    gulp.src('client_src/styl/main.styl')
        .pipe(gulpif(argv.prod, sourcemaps.init()))
        .pipe(stylus({
            use: [axis()],
            compress: argv.prod
        }))
        .pipe(prefix('last 2 versions', 'ie 9'))
        .pipe(rename('main.css'))
        .pipe(gulpif(argv.prod, rename('main.min.css')))
        .pipe(gulpif(argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(cssPath()))
        .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src(['client_src/js/*.js', '!main.js'])
        .pipe(gulpif(argv.prod, sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulpif(argv.prod, rename('main.min.js')))
        .pipe(gulpif(argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(jsPath()))
        .pipe(livereload());
});

gulp.task('image', function () {
    gulp.src('client_src/img/*.*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('client_build/img'));
});

gulp.task('watch', function() {
    livereload.listen({
        port: 3001
    });
    gulp.watch('client_src/styl/*.styl', ['css']);
    gulp.watch('client_src/js/*.js', ['js']);
    gulp.watch('client_src/*.html', ['html']);
    gulp.watch('client_src/img/*.*', ['image']);
});

gulp.task('clean', function () {
    return clean('client_build', { read: false });
});

gulp.task('style:js', function () {
    gulp.src('client_src/js/*.js')
        .pipe(jscs({ fix: true }))
        .pipe(gulp.dest('client_src/js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('style:html', function () {
    gulp.src('client_src/*.html')
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.failReporter());
});
