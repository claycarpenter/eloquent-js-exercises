
// Dynamically created RegExp objects.
(function() {
    var name = 'harry';
    var text = 'Harry is a suspicious character.';
    var regex = new RegExp('\\b(' + name + ')\\b', 'gi');
    console.log(text.replace(regex, '_$1_'));
})();

(function() {
    var name = 'Dea+hl[]rd';
    var nameEscaped = name.replace(/[^\w\s]/g, '\\$&');
    
    var text = 'This dea+hl[]rd guy is super annoying.';
    
    var regex = new RegExp('\\b(' + nameEscaped + ')\\b', 'gi');
    
    console.log(text.replace(regex, '_$1_'));
})();

(function() {
    // Search string for "not whitespace" characters.
    console.log(' word'.search(/\S/));
    //> 2
    
    // Search string of spaces for "not whitespace" characters.
    console.log('   '.search(/\S/));
    //> -1 
})();

(function() {
    var pattern = /y/g;
    
    // Move regex search start up to index 3.
    // This means the match skips the first y.
    pattern.lastIndex = 3;
    
    var match = pattern.exec('xyzzy');
    
    console.log(match.index);
    //> 4 (position of the final y)
    
    console.log(pattern.lastIndex);
    //> 5
})();

(function() {
    var digit = /\d/g;
    
    console.log(digit.exec('here it is: 1'));
    //> ['1']
    
    // Regex's lastIndex property is now beyond the limit of 
    // the string. Seaching again for the digit will fail.
    console.log(digit.exec('and now: 1'));
    //> null
})();

(function() {
    var string = 'Banana';
    var regex = /an/g;
    
    console.log('String.match');
    console.log(string.match(regex));    
    
    console.log('Regex.exec');
    console.log(regex.exec(string));    // First match
    console.log(regex.exec(string));    // Second match
    console.log(regex.exec(string));    // Fails
})();

(function() {
    var input = 'A string with 3 numbers in it... 42 and 88.';

    var number = /\b(\d+)\b/g;
    var match;
    
    while (match = number.exec(input)) {
        console.log('Found', match[1], 'at', match.index);
    }
})();

