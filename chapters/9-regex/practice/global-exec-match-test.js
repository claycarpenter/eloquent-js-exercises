(function() {
    console.log('\nNormal matching (non-global):\n');
    
    var string = 'Banana';
    var regex = /an/;
    
    console.log('String.match');
    console.log(string.match(regex));    
    
    console.log('Regex.exec');
    console.log('[call 1]', regex.exec(string));    // First call returns first match
    console.log('[call 2]', regex.exec(string));    // ..as does second.
    console.log('[call 3]', regex.exec(string));    // ..as does third.
})();

(function() {
    console.log('\nGlobal matching:\n');
    
    var string = 'Banana';
    var regex = /an/g;
    
    console.log('String.match');
    console.log(string.match(regex));    
    
    console.log('Regex.exec');
    console.log('[call 1]', regex.exec(string));    // First call returns first match
    console.log('[call 2]', regex.exec(string));    // Second call returns second match
    console.log('[call 3]', regex.exec(string));    // Fails
})();