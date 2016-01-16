module.exports = function(gulp) {
        
    gulp.task('composer-install', function(cb) {
        var exec = require('child_process').exec;
        
        exec('composer install', { cwd: 'src'}, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        }) ;
    })
    
    gulp.task('composer-update', function(cb) {
        var exec = require('child_process').exec;
        
        exec('composer update', { cwd: 'src'}, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        }) ;
    })

    gulp.task('composer-updateself', function(cb) {
        var exec = require('child_process').exec;
        
        exec('composer update --self', { cwd: 'src'}, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        }) ;
    })

};