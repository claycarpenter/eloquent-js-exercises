var test = require('simple-test'),
    forEach = require('./for-each');

(function() {
    // Arrange.
    var expected = [1, 2, 3, 4, 5];
    
    var actual = [];
    
    // Act
    forEach(expected, function(item) {
       actual.push(item); 
    });
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Simple array copy'
    );
})();

(function() {
    // Arrange.
    var expected = ['1', '2', '3', '4', '5'],
        array = [1, 2, 3, 4, 5],
        actual = [];
    
    // Act
    forEach(expected, function(item) {
       actual.push(item.toString()); 
    });
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Convert numbers to strings'
    );
})();

(function() {
    // Arrange.
    var expected = ['A', 'B', 'C', 'D', 'E'],
        array = ['a', 'b', 'c', 'd', 'e'],
        actual = [];
    
    // Act
    forEach(expected, function(item) {
       actual.push(item.toUpperCase()); 
    });
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Convert letters to uppercase'
    );
})();
