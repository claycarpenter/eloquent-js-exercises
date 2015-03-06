function AssertionFailed(message) {
    this.message = message;
}
AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
    if (!test) {
        throw new AssertionFailed(message);
    }
}

function lastElement(array) {
    assert(array.length, 'empty array in lastElement');
    
    return array[array.length - 1];
}

// Works.
console.log(lastElement([1,2,3]));

// Fails.
console.log(lastElement([]));