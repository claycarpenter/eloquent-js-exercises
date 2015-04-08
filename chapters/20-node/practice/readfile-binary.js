
var fs = require('fs');

var filename = process.argv[2],
    encoding = process.argv[3];

if (!filename) {
    throw new Error('Cannot execute without a filename provided as the only command line argument.');
}

fs.readFile(filename, encoding, function (error, buffer) {
    if (error) {
        throw error;
    }
    
    console.log('File contained:', buffer.length, 'bytes.');
    
    if (encoding) {
        console.log('Reading as', encoding, 'text. File contents:\n', buffer.toString());
    } else {
        console.log('Reading as binary. The first byte is:', buffer[0]);
    }
});