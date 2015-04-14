var fs = require('fs'),
    Q = require('q'),
    filePath = process.argv[2];

var fs_readFile = Q.denodeify(fs.readFile);

var promise = fs_readFile(filePath);

promise.then(function (result) {
    console.log(result);
}, function (error) {
    console.error(error.toString());   
});
