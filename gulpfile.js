var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var javascriptObfuscator = require('gulp-javascript-obfuscator');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css/'))
});

gulp.task('obfuscate', function(){
    gulp.src('js/*.js')
        .pipe(javascriptObfuscator({
            compact: true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('js/**/*.js',['obfuscate']);
});