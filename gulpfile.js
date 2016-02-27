var gulp = require('gulp'),
    bower = require('gulp-bower'),
    clean = require('del'),
    imagemin = require('imagemin');

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
