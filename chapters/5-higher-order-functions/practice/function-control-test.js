var test = require('simple-test'),
    functionControl = require('./function-control');

(function() {
    // Arrange.
    var expected = [1,3,5],
        actual = [],
        input = [1,2,3,4,5],
        testIsOdd = function(value) {
            // 0, falsy for even numbers, 1, truthy for odd numbers.
            return value % 2;
        };
    
    // Act.
    input.forEach(function(item) {
        functionControl.ifTrue(testIsOdd(item), function() {
            actual.push(item);
        });
    });
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Odd number picker'
    );
})();

(function() {
    // Arrange.
    var expected = [2,4],
        actual = [],
        input = [1,2,3,4,5],
        testIsOdd = function(value) {
            // 0, falsy for even numbers, 1, truthy for odd numbers.
            return value % 2;
        };
    
    // Act.
    input.forEach(function(item) {
        functionControl.ifFalse(testIsOdd(item), function() {
            actual.push(item);
        });
    });
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Even number picker'
    );
})();