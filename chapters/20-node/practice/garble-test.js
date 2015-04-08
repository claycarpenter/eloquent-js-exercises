var garble = require('./garble');

for (var i = 2, x = process.argv.length; i < x; i++) {
    var argument = process.argv[i];

    console.log(argument, '->', garble(argument));    
}
