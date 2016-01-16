module.exports = function(gulp) {
        
    gulp.task('clean', function() {

        var del = require('del');
        var path = require('path');
        
        var vars = require(path.resolve('bld/variables.js'));
        
        var pattern = [vars.dest.dir + '/**/*', '!' + vars.dest.dir + '/' + vars.dest.uploads + '/**/*'];
        console.log(pattern);
        
        return del(pattern);
    });
};