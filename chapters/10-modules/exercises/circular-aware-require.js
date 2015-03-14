'use strict';

/*
circular-require-test.js:
    var simpleRequire = require(simpleRequire),
        alpha = simpleRequire(alpha.js)

alpha.js:
    var beta = simpleRequire(beta.js)

beta.js:
    var alpha = simpleRequire(alpha.js)

*/

var fs = require('fs');

// Maybe I need to keep track here, as this seems to be the "global" scope?

/*
Cache seems like it should solve the circular dependency problem: "if a 
dependency requires a parent dependency, then just use the parent dependency."

That would work, however the cache isn't updated until after the module has 
loaded, and a parent module hasn't finished loading until all of its child
dependencies have also loaded.

I think the solution is to use a simple stack that tracks the loading chain,
and then search that stack for a match before loading each module. If there's
a match in the loading chain, that indicates that we have a circular dependency
and the loader can throw an Error in that case.
*/

function simpleRequire(filename) {
    if (simpleRequire.loadingChain.indexOf(filename) > -1) {
        // Circular dependency chain detected, throw Error.
        throw new Error('Cannot load circular dependencies. Module ' + filename + ' has been required by a child dependency.');
    }
    
    // Add filename to the loading chain queue.
    simpleRequire.loadingChain.push(filename);
    
    if (filename in simpleRequire.cache) {
        return simpleRequire.cache[filename];
    }
    
    var codeContent = fs.readFileSync(filename).toString();
    
    var moduleFunc = new Function('codeModule, simpleRequire', codeContent);
    
    var exports = Object.create(null);
    var moduleName = filename;
    var newCodeModule = {
        name: moduleName,
        exports: exports
    };
    
    moduleFunc(newCodeModule, simpleRequire);
    
    // Store the loaded module in the cache, and remove the module name from 
    // the loading chain stack.
    simpleRequire.cache[filename] = newCodeModule.exports;
    simpleRequire.loadingChain.pop();
    
    return newCodeModule.exports;
}

// Simple cache.
simpleRequire.cache = Object.create(null);

// Simple stack representing a loading chain.
simpleRequire.loadingChain = [];

if (module && module.exports) {
    module.exports = simpleRequire;
}
