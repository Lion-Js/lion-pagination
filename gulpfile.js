(function(){
    'use strict';
    var gulp = require('gulp');

    gulp.task('test', function() {
        console.log(222);
    });

    gulp.task('build', [ 'test' ]);
})();