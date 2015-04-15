var fs = require('fs'),
    Q = require('q'),
    filePath = process.argv[2] || 'test.txt';

function fs_readFile (file, encoding, callback) {
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
    
    deferred.promise.nodeify(callback);
    
    return deferred.promise;
}

function readFileCallback (error, result) {
    console.log('readFileCallback');
    
    if (error) {
        console.error(error.toString());
    } else {
        console.log(result);
    }
}

var result = fs_readFile(filePath, 'utf8', readFileCallback);

result.then(console.log, console.error);
