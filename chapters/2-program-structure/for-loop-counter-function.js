
var NegativeCounter = function () {
    var counter = 5;
    
    this.count = function () {
        counter--;
        
        return counter > 0;
    }
    
    this.getCount = function() {
        return counter;
    }
}

var counter = new NegativeCounter();

console.log('Initial count: ' + counter.getCount());
for (; counter.count(); ) {
    console.log('Count: ' + counter.getCount());
}