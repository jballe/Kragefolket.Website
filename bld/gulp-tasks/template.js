'use strict';

module.exports = function(gulp, process) {
   
    var path  = require('path');
    var utils = require(path.resolve('bld/utils.js'));

    var vars = utils.vars();
    
    var makeBuildState = function() {

        if(process.env.SNAP_CI) {
           return {
               machine: 'snap-ci',
               counter: process.env.SNAP_PIPELINE_COUNTER,
               commit: process.env.SNAP_COMMIT_SHORT
           };    
       } else {
           return {
               machine: require('os').hostname(),
               counter: '0',
               commit: ''
           };
       }
    };

    gulp.task('template', function() {
       var template = require('gulp-template');
        
       var _ = require('lodash');

       var data = {}
       _.extend(data, utils.vars().config);
       _.extend(data, utils.environment().config);
       data.build = makeBuildState();
               
       return gulp.src(vars.src.templatedir + '/**')
             .pipe(template(data))
             .pipe(gulp.dest(vars.dest.dir))
    });

};