/*
    Eloquent Javascript - Chapter 4
    Exersice: Sum of a range
*/

var range = function (begin, end, step) {
    var rangeValues = [begin];
    var step = step || 1;
    var isStepPositive = step > 0;
    
    var current = begin;
    
    var checkStep = function (current, end, step) {
        if (isStepPositive) {
            return (current + step) <= end;
        }
        
        return (current + step) >= end;
    };
    
    while (checkStep(current, end, step)) {
        current += step;

        rangeValues.push(current);
    }
    
    return rangeValues;
};

var sum = function (values) {
    var total = 0;
    
    for (var i = 0; i < values.length; i++) {
        total += values[i];
    };
    
    return total;
};

var testRange = function (begin, end, step) {
    console.log('Creating array from ' + begin + ' to ' + end + ' wtih a step of ' + step);
    var resultRange = range(begin, end, step);
    console.log('Result: ' + resultRange);
    
    return resultRange;
};

var testSum = function (values) {
    console.log('Summing these values: ' + values);
    var sumResult = sum(values);
    console.log('Result: ' + sumResult);
    
    return sumResult;
};

var testSumRange = function (begin, end, step) {
    var resultRange = testRange(begin, end, step);
    testSum(resultRange);
};

testRange(1, 10, 1);
testRange(0, 5, 1);
testRange(-10, 0, 1);
testRange(0, 8, 2);
testRange(1,100, 5);

testSum([1]);
testSum([1,2,3,4]);
testSum([-5,-4,-3,-2,-1]);
testSum([100, 200, 34, 2002]);

testSumRange(1, 10, 1);
testSumRange(0, 8, 2);
testSumRange(-10, 0, 2);
testSumRange(0, 100, 5);
testSumRange(10, 0, -2);
