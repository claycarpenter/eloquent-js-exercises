/*
    Eloquent Javascript - Chapter 3
    Exercise: Is even
*/

var isEven = function (number) {
    // Flip negative numbers to positive values.
    number = number > 0 ? number : number * -1;
    
    if (number === 0) {
        return true;
    } else if (number === 1) {
        return false;
    }
    
    return isEven(number - 2);
};

var testIsEven = function (number) {    
    console.log(number + ' is even: ' + isEven(number));
};

testIsEven(50);
testIsEven(75);
testIsEven(0);
testIsEven(1);
testIsEven(-1);
testIsEven(-30);