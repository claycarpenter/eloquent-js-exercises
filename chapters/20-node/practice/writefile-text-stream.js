var fs = require('fs');

var writeStream = fs.createWriteStream('stream-out.txt', {encoding: 'utf8'});

console.log('Bytes written:', writeStream.bytesWritten);

function doneCallback () {
    console.log('Done writing content.');
}

for (var i = 0; i < 100; i++) {
    writeStream.write(i.toString() + ' ', doneCallback);
}

writeStream.end();