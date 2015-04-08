var fs = require('fs');

fs.writeFile('graffiti.txt', 'Node was here\n', function (error) {
    if (error) {
        console.error('Failed to write file:', error);
    } else {
        console.log('File written.');
    }
});
