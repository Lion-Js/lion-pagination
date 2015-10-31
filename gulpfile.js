(function(){
    'use strict';
    var gulp = require('gulp');

    gulp.task('test', function() {
        console.log(111);
    });

    gulp.task('build', [ 'test' ]);
})();