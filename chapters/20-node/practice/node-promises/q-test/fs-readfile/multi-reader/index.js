
var Q = require('q'),
    fs = require('fs'),
    mime = require('mime');

var fs_readFile = Q.denodeify(fs.readFile);

// Assume all CLI arguments are paths.
var fileArguments = Array.prototype.slice.call(process.argv, 2);

function readFileSuccessPrintName (filePath) {
    return function (result) {
        console.log(filePath, 'read successfully');
        
        return result;
    }
}

function readFileSuccessPrintMime (filePath) {
    return function (result) {
        console.log(filePath, 'has mime type of', mime.lookup(filePath));
               
        return result;
    }
}

function printTextFileLength (fileData) {
    var text = fileData.toString();

    console.log('File length:', text.length);
    
    return fileData;
}

var fileReadPromises = [];
fileArguments.forEach(function (filePath) {
    var promise = fs_readFile(filePath);
    
    promise
        .then(readFileSuccessPrintName(filePath))
        .then(readFileSuccessPrintMime(filePath))
        .then(printTextFileLength);
    
    fileReadPromises.push(promise);
});

var allPromise = Q.all(fileReadPromises);
allPromise.then(function (results) {
    console.log('Done reading', results.length, 'files');
}, function (error) {
    console.error('Combined operation error:', error.toString());
});
