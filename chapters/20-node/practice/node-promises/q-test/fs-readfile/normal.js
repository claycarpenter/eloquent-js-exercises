var fs = require('fs'),
    filePath = process.argv[2];

fs.readFile(filePath, 'utf8', function (error, contents) {
    if (error) {
        console.error(error.toString());
        
        return;
    }
    
    console.log(contents);
});
