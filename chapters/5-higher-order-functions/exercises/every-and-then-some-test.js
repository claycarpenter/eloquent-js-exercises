var test = require('simple-test'),
    arrayUtils = require('./every-and-then-some');

(function() {
    // Arrange.
    var expected = true,
        inputArray = [2,4,6,8],
        actual;
    
    // Act.
    actual = arrayUtils.every(inputArray, 
        function(item) {
            return !(item % 2);      
        }
    );
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Every number in array is even'
    );
})();

(function() {
    // Arrange.
    var expected = false,
        inputArray = [1,2,3,-4,5,6],
        actual;
    
    // Act.
    actual = arrayUtils.every(inputArray, 
        function(item) {
            return item > 0;      
        }
    );
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Every number in array is positive'
    );
})();

(function() {
    // Arrange.
    var expected = true,
        inputArray = [1,2,3,-4,5,6],
        actual;
    
    // Act.
    actual = arrayUtils.some(inputArray, 
        function(item) {
            return item < 0;      
        }
    );
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Some number in array is negative'
    );
})();