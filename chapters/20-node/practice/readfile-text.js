
var fs = require('fs');

var filename = process.argv[2];

if (!filename) {
    throw new Error('Cannot execute without a filename provided as the only command line argument.');
}

fs.readFile(filename, 'utf8', function (error, fileText) {
    if (error) {
        throw error;
    }
    
    console.log('File contained:\n', fileText);
});