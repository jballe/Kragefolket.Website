module.exports = function(gulp) {
   
    var path  = require('path');
    var utils = require(path.resolve('bld/utils.js'));

    var sync = require('gulp-sync')(gulp);
    var vars = utils.vars();
        
    gulp.task('filedeploy', function() {

        var newer = require('gulp-newer');

        var pattern = [
            // Files:
            vars.src.vendordir + '/**',
            // Languages
            vars.src.languages + '/**',
            // Files:
            vars.src.customdir + '/**',
            // Server
            'cfg/srv-' + utils.servertype() + '/**'
            ];
        vars.src.exclusions.forEach(function(element) {
            pattern.push('!' + element);
        }, this);
        
        return gulp.src(pattern)
            .pipe(newer(vars.dest.dir))
            .pipe(gulp.dest(vars.dest.dir));
    });
        
    gulp.task('localdeploy', sync.async(['template', 'filedeploy']));
};