(function() {
    var colors = require('colors');
    
    function testRegex(pattern, tests) {
        console.log('\nTesting regex pattern ' + pattern + ':');
    
        var successCounter = 0;
        
        tests.forEach(function(test) {
            var matches = pattern.test(test.string);
            
            var resultLabel = (matches == test.expected) ? colors.green('PASS') : colors.red('FAIL');
            
            if (resultLabel) successCounter++;
    
            console.log('  ' + resultLabel + ' :: \"' + test.string + '\", expected ' + test.expected);
        });
        
        console.log(
            '\nTest results: ', successCounter, 'of', tests.length, 
            (tests.length > 0 ? 'tests' : 'test'), 'passed.\n');
    }
    
    function Test(string, expected) {
        this.string = string;
        this.expected = expected;
    }
    
    module.exports = Object.create(null);
    module.exports.testRegex = testRegex;
    module.exports.Test = Test;
})();