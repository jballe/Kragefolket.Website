'use strict';

module.exports = function(gulp) {
  
    gulp.task('dowatch', function() {

        var path = require('path');

        var utils = require(path.resolve('bld/utils.js'));
        var vars = utils.vars();
        
        gulp.watch(vars.src.customdir + '/**', ['filedeploy']);
        gulp.watch('bld/variables.js', ['template']);
        gulp.watch('environment.js', ['template']);
        gulp.watch(vars.src.templatedir + '/**', ['template']);
    });
    
};