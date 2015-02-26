
var StringArrayCounter = function () {
    var letters = ['a','b','','c','d','e'];
    var currentLetter;
    
    this.count = function () {
        letters = letters.splice(1, letters.length);
        
        return this.getCurrentLetter();
    }
    
    this.getCount = function () {
        return letters.length;
    }
 
    this.getCurrentLetter = function () {
        return letters[0];
    }
}

var counter = new StringArrayCounter();

console.log('Initial count: ' + counter.getCount() + ', current letter: ' + counter.getCurrentLetter());
for (; counter.count(); ) {
    console.log('Count: ' + counter.getCount() + ', current letter: ' + counter.getCurrentLetter());
}