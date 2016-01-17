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

       var url = makeAbsolutePath(relativePath);
       var logfilename = logFileName + '.json'; 
       console.log('Starting PageSpeed Insights for ' + url + ' writing result to ' + vars.reports.dir + '/' + logfilename);
       
       psi(url).then(function (data) {
            console.log('');
            console.log('PageSpeed Result for ' + url);
            console.log('Speed score: ' + data.ruleGroups.SPEED.score);
            console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
            console.log('');
            
            writeData(JSON.stringify(data), path.resolve(vars.reports.dir), logfilename);
            callback();
            
        }, function(err) {
            console.log(arguments);
            callback();
        });
        return;
    }
    
    function saveWebpageTest(results, logfilename, callback) {

        var path = require('path');
        var Download = require('download');
        var utils = require(path.resolve('bld/utils.js'));

        var vars = utils.vars();
        
        var outputdir = path.resolve(vars.reports.dir);
        var datafilename = logfilename + '-data.json';
        writeData(JSON.stringify(results.data, null, 4), outputdir, datafilename);
            
        var filesToDownload = 0, filesDownloaded = 0, filesDone = false;
        
        for(var view in results.data.runs['1']) {
            var viewObj = results.data.runs['1'][view];
            for(var image in viewObj.images) {
                var newfilename = logfilename + '-' + view + '-' + image + '.png';
                var url = viewObj.images[image];
                console.log('Download ' + newfilename);
                filesToDownload++;
                new Download().get(url).rename(newfilename).dest(outputdir).run(function(err) {
                    if(err) { console.log(err);}
                    filesDownloaded++;
                    console.log('downloaded ' + filesDownloaded + ' of ' + filesToDownload + ' files' + filesDone ? '' : ' (stil adding files)');
                    if ( filesDownloaded == filesToDownload && filesDone) {
                        callback();
                    }
                });
            }
        }
        filesDone = true;
    }
    
    function webpagetest(relativePath, logfilename, callback) {

        // This is only for testing...        
        //var oldData = JSON.parse(require('fs').readFileSync(require('path').resolve('output/webpagetest-frontpage-data.json')).toString());
        //saveWebpageTest({ "data": oldData}, logfilename, callback);
        //return; 
     
        var path = require('path');
        var WebPageTest = require('webpagetest');
        var utils = require(path.resolve('bld/utils.js'));

        var env = utils.environment();

        var location = 'ec2-eu-west-1:Chrome'; // London, Chrome
        var url = makeAbsolutePath(relativePath);
        var apikey = env.config.keys.webpagetest;
        if(!apikey) {
            console.log('please specify apikey for webpagetest in environment.json (config.keys.webpagetest)');
            return;
        }
        
        var wpt = new WebPageTest('www.webpagetest.org', apikey);
        var config = {
            location: location,
        };
        wpt.runTest(url, config, function(err, data) {
            if(err) {
                console.log(err);
                callback();
                return;
            }
            
            var testId = data.data.testId;
            console.log('webpagetest id: ' + testId);

            var checkStatus = function() {
                wpt.getTestStatus(testId, function(err, data) {
                    console.log('webpagetest: ' + data.data.statusText);
                    if(!data || !data.data.completeTime) {
                        return setTimeout(checkStatus, 1000);
                    }
                    
                    wpt.getTestResults(testId, function(err, data) {
                        saveWebpageTest(data, logfilename, callback);
                    });
                });
            };
            
            checkStatus();
        }); 
    }

    function createGulpTasks(key, relativePath) {
        
        var wptname = 'webpagetest:' + key;
        gulp.task(wptname, function(cb) {
            webpagetest(relativePath, 'webpagetest-' + key, cb);
        });    

        var psiDesktopName = 'pagespeed:'+key+'-desktop';
        gulp.task(psiDesktopName, function(cb) {
            pagespeed(relativePath, 'desktop', 'pagespeed' + key + '-desktop', cb);
        });    

        var psiMobileName = 'pagespeed:' + key +'-mobile';
        gulp.task(psiMobileName, function(cb) {
            pagespeed(relativePath, 'mobile', 'pagespeed' +key + '-desktop', cb);
        });
        var name = 'performance-remote-' + key;
        gulp.task(name, [wptname, psiDesktopName, psiMobileName]);
        return name;
    }    
    
    createGulpTasks

    gulp.task('performancetests-remote', [createGulpTasks('frontpage', '/'), createGulpTasks('bliv-spejder', '/bliv-spejder'), createGulpTasks('kragekaldet', '/kragekaldet')]);    

};