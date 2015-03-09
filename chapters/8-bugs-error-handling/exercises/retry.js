
function MultiplicatorUnitFailure() {}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

function primitiveMultiply(a, b) {
    var failure = Math.floor(Math.random() * 2);
    
    if (failure) {
        throw new MultiplicatorUnitFailure();
    }
    
    return a * b;
}

function Result(a, b, resultValue, attempts) {
    this.a = a;
    this.b = b;
    this.resultValue = resultValue;
    this.attempts = attempts;
}

function safeMultiply(a, b) {
    
    var resultValue, attempts = 0;
    
    // There is a bug in this code that causes an infinite
    // loop when the result of the multiplication is 0 (and
    // therefore falsy).
    while (!resultValue) {
        attempts++;
        
        try {
            resultValue = primitiveMultiply(a, b);
        } catch (error) {
            if (error instanceof MultiplicatorUnitFailure) {
                // Multiplication attempt failed; retry.
                continue;
            } else {
                // Unexpected error type, re-throw error.
                throw error;
            }
        }
    }
    
    var result = new Result(a, b, resultValue, attempts);
    
    return result;
}

var attempts = 0,
    results = [],
    inputArray = [1,2,3,4,5,6,7,8,9,10];

for (var outerIdx = 0; outerIdx < inputArray.length; outerIdx++) {
    for (var innerIdx = 0; innerIdx < inputArray.length; innerIdx++) {
        var result = safeMultiply(inputArray[outerIdx], inputArray[innerIdx]);
        
        results.push(result);
    }
}

results.forEach(function(result) {
    attempts += result.attempts;
    console.log(result.a + ' * ' + result.b + ' = ' + result.resultValue + ', attempts: ' + result.attempts);
});

console.log(attempts + ' attempts required to generate ' + results.length + ' results.');

