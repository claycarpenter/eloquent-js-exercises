console.log('In circular-require-test');

var simpleRequire = require('./circular-aware-require'),
    alpha = simpleRequire('./alpha.js');

console.log('Done loading circular-require-test 2');

console.log('Testing alpha import: ' + alpha());