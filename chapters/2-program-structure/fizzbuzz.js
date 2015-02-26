/*
    Eloquent Javascript - Chapter 2
    Exercise: FizzBuzz
*/

var startNumber = 1,
    endNumber = 100;


var isDivisibleBy3 = function (value) {
    return (value % 3) == 0;
}

var isDivisibleBy5 = function (value) {
    return (value % 5) == 0;
}

var printOut = function (number, message) {
    console.log(number + ': ' + message);
}

for (var i = startNumber; i <= endNumber; i++) {
    if (isDivisibleBy3(i) && isDivisibleBy5(i)) {
        // Print 'FizzBuzz'
        printOut(i, 'FizzBuzz');
    } else if (isDivisibleBy3(i)) {
        // Print 'Fizz'
        printOut(i, 'Fizz');
    } else if (isDivisibleBy5(i)) {
        // Print 'Buzz'
        printOut(i, 'Buzz');
    } else {
        // Just print out the number.
        printOut(i, i);
    }
}
