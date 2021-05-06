let gulp = require('gulp'),
    order = require('gulp-order'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    smap = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default;

    
const { logError } = require('gulp-sass');

gulp.task('sass', function(cb) {
    gulp
        .src('styles/neu.scss')
        .pipe(order())
        .pipe(smap.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(smap.write('.'))
        .pipe(
            gulp.dest(function(f) {
                //return f.base;
                return './'
            })
        );
    cb();
});


gulp.task('default',
    gulp.series(['sass'], function(cb) {
        gulp.watch('styles/neu/**/*.scss', gulp.series('sass'));
        cb();
    })   
);