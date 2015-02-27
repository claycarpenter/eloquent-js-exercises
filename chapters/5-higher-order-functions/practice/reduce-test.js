var ancestry = require('./ancestry'),
    reduce = require('./reduce');

var inputArray = [1,2,3,4];

console.log('Reduce of ' + inputArray + ' with start value of 0');
console.log(reduce(inputArray, function(a, b) {
    return a + b;
}, 0));

console.log('Reduce of ' + inputArray + ' with start value undefined');
console.log(reduce(inputArray, function(a, b) {
    return a + b;
}));

console.log('Reduce of ' + inputArray + ' with start value of -5');
console.log(reduce(inputArray, function(a, b) {
    return a + b;
}, -5));

console.log(reduce(ancestry, function(min, cur) {
    if (cur.born < min.born) {
        return cur;
    } 
    
    return min;
}));