var fs = require('fs'),
    parser = require('./egg-parser.js');

var filename = process.argv[2];

console.log('Loading file:', filename);

var contents = fs.readFileSync(filename).toString();

console.log('\nFound this program:');
console.log(contents);

console.log('\nParsing and executing program (debug).');
parser.run(contents, {printSyntaxTree: true});

