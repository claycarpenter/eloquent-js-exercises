(function() {
    var colors = require('colors');
    
    function testRegex(pattern, tests) {
        console.log('\nTesting regex pattern ' + pattern + ':');
    
        tests.forEach(function(test) {
            var matches = pattern.test(test.string);
            
            var resultLabel = (matches == test.expected) ? colors.green('PASS') : colors.red('FAIL');
    
            console.log('  ' + resultLabel + ' :: \"' + test.string + '\", expected ' + test.expected);
        });
    }
    
    function Test(string, expected) {
        this.string = string;
        this.expected = expected;
    }
    
    module.exports = Object.create(null);
    module.exports.testRegex = testRegex;
    module.exports.Test = Test;
})();