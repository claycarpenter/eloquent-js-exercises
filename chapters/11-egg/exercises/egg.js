var fs = require('fs'),
    parser = require('./egg-parser.js');

var contents = fs.readFileSync('./simple-1.egg').toString();

console.log('Found this program:')
console.log(contents);

console.log('Parsing and executing program (debug).');
parser.run(contents, {printSyntaxTree: true});

