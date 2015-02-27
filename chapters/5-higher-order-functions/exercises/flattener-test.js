var test = require('simple-test'),
    flattener = require('./flattener');

(function() {
    // Arrange.
    var expected = [1,2,3],
        inputArray = [[1],[2],[3]],
        actual;
    
    // Act.
    actual = flattener(inputArray);
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'Flattening of input array ' + JSON.stringify(inputArray)
    );
})();