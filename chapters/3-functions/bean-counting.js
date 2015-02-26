/*
    Eloquent Javascript - Chapter 3
    Exercise: Bean counting
*/

var countChar = function (text, charToFind) {
    var charCount = 0;
    
    for (var i = 0; i < text.length; i++) {
        var currentChar = text.charAt(i);
        
        if (currentChar === charToFind) {
            charCount++;
        }
    }
    
    return charCount;
};

var testCountChar = function (text, charToFind) {    
    console.log('Searching \"' + text + '\" for \"' + charToFind + '\": ' + countChar(text, charToFind) + ' result(s)');
};

testCountChar('Beans', 'B');
testCountChar('Bakaed Beans', 'B');
testCountChar('Arbor Day', 'r');
testCountChar('Blubber', 'b');
    