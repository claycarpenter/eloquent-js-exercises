var test = require('simple-test'),
    ArraySequence = require('./sequence-array'),
    RangeSequence = require('./sequence-range');

var captureFive = function (sequence) {
    var captures = [];
    
    var i = 0,
        max = 5;
        
    while (sequence.hasNext() && i < max) {
        var item = sequence.next();
        
        captures.push(item);
        
        i++;
    }
    
    return captures;
};

(function() {
    // Arrange.
    var expected = [1,2,3,4,5],
        inputArray = [1,2,3,4,5,6,7],
        actual;
    
    // Act.
    var arraySequence = new ArraySequence(inputArray);
    actual = captureFive(arraySequence);
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'captureFive on larger array sequence');
})();

(function() {
    // Arrange.
    var expected = [1,2,3],
        inputArray = [1,2,3],
        actual;
    
    // Act.
    var arraySequence = new ArraySequence(inputArray);
    actual = captureFive(arraySequence);
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'captureFive on smaller array sequence');
})();

(function() {
    // Arrange.
    var expected = [1,2,3,4,5],
        actual;
    
    // Act.
    var rangeSequence = new RangeSequence(1,7);
    actual = captureFive(rangeSequence);
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'captureFive on larger range sequence');
})();

(function() {
    // Arrange.
    var expected = [1,2,3],
        actual;
    
    // Act.
    var rangeSequence = new RangeSequence(1,3);
    actual = captureFive(rangeSequence);
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'captureFive on smaller range sequence');
})();