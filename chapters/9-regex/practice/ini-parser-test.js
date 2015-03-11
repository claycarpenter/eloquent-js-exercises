var iniParser = require('./ini-parser'),
    fs = require('fs');

var fileContents = fs.readFileSync('test.ini').toString();
var parseResults = iniParser(fileContents);
console.log('Results:\n' + JSON.stringify(parseResults));
