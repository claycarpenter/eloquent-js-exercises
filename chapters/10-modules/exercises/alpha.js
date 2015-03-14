console.log('In alpha');

var beta = simpleRequire('./beta.js');
    
console.log('Done loading alpha');

codeModule.exports = function() {
    return 'alpha';
}