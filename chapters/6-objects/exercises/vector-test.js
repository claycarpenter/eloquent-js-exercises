var test = require('simple-test'),
    Vector = require('./vector');

(function() {
    // Arrange.
    var expected = Math.sqrt(8),
        x = 2,
        y = 2,
        actual;
    
    // Act.
    var vector = new Vector(x, y);
    actual = vector.length;
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'x:2, y:2 length');
})();


(function() {
    // Arrange.
    
    var x = 2,
        y = 2,
        vector = new Vector(x, y),
        expected = vector.length,
        actual;
    
    // Act.
    vector.length = 42;
    actual = vector.length;
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'length is immutable');
})();


(function() {
    // Arrange.
    var x = 2,
        y = 2,
        vectorA = new Vector(x, y),
        vectorB = new Vector(x, y),
        expected = new Vector(x + x, y + y),
        actual;
    
    // Act.
    actual = vectorA.plus(vectorB);
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'vector plus() test');
})();


(function() {
    // Arrange.
    var x = 2,
        y = 2,
        vectorA = new Vector(x, y),
        vectorB = new Vector(x, y),
        expected = new Vector(0, 0),
        actual;
    
    // Act.
    actual = vectorA.minus(vectorB);
    
    // Assert.
    test.areEqual(
        expected,
        actual,
        'vector minus() test');
})();
