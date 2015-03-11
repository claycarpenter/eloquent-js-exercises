(function() {
    var colors = require('colors');
    
    function consoleError(message) {
        console.log(message.red);
    }
    
    function consoleSuccess(message) {
        console.log(message.green);
    }
    
    function consoleReporter(regex, string) {
        console.log('Returning results of regex ' + regex + ' against \"' + string + '\"');
        var result = regex.exec(string);
        
        if (!result) {
            consoleError('No matches found.\n');
            
            return;
        }
        
        consoleSuccess('Matches: ' + result.length);
        consoleSuccess('  [matching string] -\t' + result[0])
        for (var i = 1, x = result.length; i < x; i++) {
            consoleSuccess('  [cptr group ' + i + '] -\t\"' + result[i] + '\"');
        }
        
        consoleSuccess('Index of first match: ' + result.index);
    
        consoleSuccess('');
    }
    
    module.exports = consoleReporter;
})();