/*
Simple module to wrap Node fs async calls in Q promises.
*/
(function (exportable) {
    var fs = require('fs'),
        Q = require('q');
    
    // Simple Promise wrapper around fs.stat.
    function stat (path) {
        var deferred = Q.defer();
        
        fs.stat(path, function (error, stats) {
            if (error) {
                // Fail, reject promise.
                deferred.reject(error);
            } else {
                // Success, resolve promise.
                deferred.resolve(stats);
            }
        });
        
        return deferred.promise;
    }
    exportable.stat = stat;
    
    // Simple Promise wrapper around fs.readdir
    function readdir (path) {
        var deferred = Q.defer();
        
        fs.readdir(path, function (error, files) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(files);
            }
        });
        
        return deferred.promise;
    }
    exportable.readdir = readdir;
})(module.exports);