
console.log('In beta');

var beta = simpleRequire('./alpha.js');

codeModule.exports = function() {
    return 'beta';
};
