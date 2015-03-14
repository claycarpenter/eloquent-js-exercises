'use strict';

var fs = require('fs');

function simpleRequire(filename) {
    if (filename in simpleRequire.cache) {
        return simpleRequire.cache[filename];
    }
    
    var codeContent = fs.readFileSync(filename);
    
    var moduleFunc = new Function('module', codeContent);
    
    var module = {exports: {}};
    
    moduleFunc(module);
    
    simpleRequire.cache[filename] = module.exports;
    
    return module.exports;
}

simpleRequire.cache = Object.create(null);

if (module && module.exports) {
    module.exports = simpleRequire;
}