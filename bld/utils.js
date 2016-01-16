'use strict';

var result = {
    varsFileName: 'bld/variables.js',
    environmentFileName: 'environment.json',
    
    _vars: null,
    _environment: null
};

result.vars = function() {
    var path = require('path');
    return require(path.resolve(result.varsFileName));    
}

result.environment = function() {

    if(!this._environment) {
        var path = require('path');
        var fs = require('fs');
        var jsonfile = require('jsonfile');

        var envPath = path.resolve(this.environmentFileName);

        if(!fs.existsSync(envPath)) {
            throw 'There must be an environment.json with config values such as database. See environment.sample'
        }   
                    
        this._environment = jsonfile.readFileSync(envPath);
    }
    
    return this._environment;
};
    
result.servertype = function() {

    var gutil = require('gutil');
    var env = this.environment();

    var result = 'iis';
    var source = 'default';
    
    if(gutil.env && gutil.env.servertype) {
        result = gutil.env.servertype;
        source = 'argument';
    }
    
    else if(env && env.servertype) {
        result = env.servertype;
        source = 'environment file';
    }
    
    console.log('servertype: ' + result + ' by ' + source);
    return result;
};

module.exports = result;