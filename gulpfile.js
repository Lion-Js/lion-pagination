(function(){
    'use strict';
    var gulp = require('gulp');
    var compass = require('gulp-compass');
    var plumber = require('gulp-plumber');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
    var minify_css = require('gulp-minify-css');
    var shelljs = require('shelljs');

    //编译sass文件
    gulp.task('compile_sass', function() {
    	shelljs.rm('-rf', './build/css');
		return gulp.src('./src/sass/pages/*.scss')
			.pipe(plumber())
			.pipe(compass({
			    css: './build/css/',
      		    sass: './src/sass/'
			}))
		    .pipe(gulp.dest('./build/css'))
		    .on('end', function() {
		    	gulp.src('./build/css/*.css')
		    		.pipe(minify_css())
		    		.pipe(rename(function(path) {
				        path.basename += '.min';
				    }))
				    .pipe(gulp.dest('./build/css'));
		    });
	});

    //watch
	gulp.task('watch_sass', function() {
	    return gulp.watch('./src/sass/**/*', ['compile_sass']);
	});

	//发布版本
	gulp.task('publish', function() {
        return gulp.src('./build/**/*').pipe(gulp.dest('./dist/'));
	});

    gulp.task('build', ['compile_sass']);
    gulp.task('watch', ['watch_sass']);
})();