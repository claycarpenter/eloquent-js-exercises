
// Regex.exec and String.match return the same result 
// object (or null if no match was made).

function testExec(regex, string) {
    return regex.exec(string);
}

function testMatch(regex, string) {
    return string.match(regex);
}

function consoleReporter(testFunc, regex, string) {
    console.log('Returning results of regex ' + regex + ' against \"' + string + '\"');
    var result = testFunc(regex, string);
    
    if (!result) {
        console.log('No matches found.');
        
        return;
    }
    
    console.log('Matches: ' + result.length);
    console.log('\t [matching string]: ' + result[0])
    for (var i = 1, x = result.length; i < x; i++) {
        console.log('\t [cptr group ' + i + '] - \"' + result[i] + '\"');
    }
    
    console.log('Index of first match: ' + result.index);

    console.log();
}

function findDate(string) {
    var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
    var match = dateTime.exec(string);
    
    console.log(match);
    
    return new Date(
        Number(match[3]), Number(match[2]), Number(match[1]));
}

consoleReporter(testExec, /\d+/, 'one two 100');

consoleReporter(testMatch, /\d+/, 'one two 100');

consoleReporter(testExec, /(\d)+/, 'one two 100');

consoleReporter(testExec, /(\d{1,2})-(\d{1,2})-(\d{4})/, '30-1-2003');

consoleReporter(testExec, /(\d{1,2})-(\d{1,2})-(\d{4})/, '100-1-30000');

console.log(findDate('30-1-2003'));


