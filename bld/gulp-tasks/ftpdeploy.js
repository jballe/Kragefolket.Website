'use strict';

module.exports = function(gulp) {
  
    gulp.task('ftpdeploy', function() {

        var path = require('path'); 
        var ftp = require('vinyl-ftp');
        var gutil = require('gutil');
       var _ = require('lodash');
        
        var utils = require(path.resolve('bld/utils.js'));
        var vars = utils.vars(); 
        
        var ftpconfig = {
            parallel: 10,
        };
        if(gutil.env && gutil.env.verbose) {
            ftpconfig.log = gutil.log
        }
        ftpconfig = _.extend(ftpconfig, utils.environment().ftp);
         
        var conn = ftp.create(ftpconfig);
        var remoteFolder = ftpconfig.path || '/'
        
        var localPath = path.resolve(vars.dest.dir);
        console.log('Upload to host: ' + ftpconfig.host + ' localpath: ' + localPath + ' remote dir:' + remoteFolder);
        
        return gulp.src(['./**'], { cwd: vars.dest.dir, buffer: false })
            .pipe(conn.newerOrDifferentSize(remoteFolder))
            .pipe(conn.dest(remoteFolder))
            .on('error', gutil.log);
    });
    
};