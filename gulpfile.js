(function(){
    'use strict';
    var gulp       = require('gulp');
    var compass    = require('gulp-compass');
    var plumber    = require('gulp-plumber');
    var concat     = require('gulp-concat');
    var rename     = require('gulp-rename');
    var minify_css = require('gulp-minify-css');
    var uglify     = require('gulp-uglify');
    var shelljs    = require('shelljs');

    // 编译sass文件
    // ====================
    gulp.task('compile_sass', function() {
    	shelljs.rm('-rf', './dist/css');
		return gulp.src('./src/sass/pages/*.scss')
			.pipe(plumber())
			.pipe(compass({
			    css: './dist/css/',
      		    sass: './src/sass/'
			}))
		    .pipe(gulp.dest('./dist/css'))
		    .on('end', function() {
		    	gulp.src('./dist/css/*.css')
		    		.pipe(minify_css())
		    		.pipe(rename(function(path) {
				        path.basename += '.min';
				    }))
				    .pipe(gulp.dest('./dist/css'));
		    });
	});

	// js文件压缩
	// ====================
	gulp.task('min_js', function() {
		shelljs.rm('-rf', './dist/js');
		return gulp.src('./src/javascript/*.js')
			.pipe(gulp.dest('./dist/js'))
			.on('end', function() {
				gulp.src('./dist/js/*.js')
					.pipe(uglify())
					.pipe(rename(function(path) {
				        path.basename += '.min';
				    }))
				    .pipe(gulp.dest('./dist/js'));
			});
	});

    // watch sass
    // ====================
	gulp.task('watch_sass', function() {
	    return gulp.watch('./src/sass/**/*', ['compile_sass']);
	});

	// watch js
    // ====================
	gulp.task('watch_js', function() {
	    return gulp.watch('./src/javascript/*.js', ['min_js']);
	});

    gulp.task('default', ['compile_sass', 'min_js']);
    gulp.task('watch', ['watch_sass', 'watch_js']);
})();