var fs = require('fs'),
    Q = require('q'),
    filePath = process.argv[2];

function fs_readFile (file, encoding) {
    var deferred = Q.defer();
    
    fs.readFile(file, encoding, function (error, data) {
        // Create a callback that calls the Promise's reject in case of error,
        // otherwise calls resolve with file contents.
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(data);
        }
    });
    
    return deferred.promise;
}

fs_readFile(filePath, 'utf8')
    .then(console.log, console.error);
