/*
    Eloquent Javascript - Chapter 3
    Exercise: Minimum
*/

var minimum = function (a, b) {
    if (a < b) {
        return a;
    }
    
    return b;
}

var testMinimum = function(a, b) {
    console.log(a + ', ' + b + ': ' + minimum(a, b));
}

testMinimum(5, 3);
testMinimum(-1, 0);
testMinimum(0,0);
testMinimum(100,100.1)
