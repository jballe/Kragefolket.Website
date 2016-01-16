'use strict';

module.exports = function(gulp) {
    
    function makeAbsolutePath(relativePath) {
        var path = require('path');
        var utils = require(path.resolve('bld/utils.js'));
        var env = utils.environment(); 
        var hostname = env.config.hostname;
        
        var baseurl = 'http://' + hostname;
        
        return baseurl + relativePath; 
    }

/*
    function yslow(relativePath, callback) {
        var YSlow = require('yslowjs');
        
        var url = makeAbsolutePath('/');
        var yslow = new YSlow(url, ['--info', 'grade', '--format', 'tap', '--threshold', 'B']);
        
        yslow.run(function(error, result) {
            if(error) {
                console.trace(error);
            } else {
                console.log(result);
            }
            
            callback();
        });
    }
*/
    function writeData(data, folder, filename) {
       var fs = require('fs');
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder);
        }
        
        var filename = folder + '/' + filename;
        fs.writeFileSync(filename, data);
    }

    function pagespeed(relativePath, strategy, logFileName, callback) {
       var psi = require('psi');
       
       var path = require('path');
       var vars = require(path.resolve('bld/utils.js')).vars();

       var url = makeAbsolutePath('/');
       var logfilename = logFileName + '.json'; 
       console.log('Starting PageSpeed Insights for ' + url + ' writing result to ' + vars.reports.dir + '/' + logfilename);
       
       psi(url).then(function (data) {
            console.log('');
            console.log('Result for ' + url);
            console.log('Speed score: ' + data.ruleGroups.SPEED.score);
            console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
            console.log('');
            
            writeData(data, path.resolve(vars.reports.dir), logfilename);
            callback();
            
        }, function(err) {
            console.log(arguments);
            callback();
        });
        return;
    }

    gulp.task('pagespeed:frontpage-mobile', function(cb) {
        pagespeed(makeAbsolutePath('/'), 'mobile', 'frontpage-mobile', cb);
    })    

    gulp.task('pagespeed:frontpage-desktop', function(cb) {
        pagespeed(makeAbsolutePath('/'), 'desktop', 'frontpage-desktop', cb);
    })    

    gulp.task('performancetests-remote', ['pagespeed:frontpage-mobile', 'pagespeed:frontpage-desktop']);    

};