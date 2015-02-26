/*
    Eloquent Javascript - Chapter 4
    Exersice: Reversing an array
*/

var reverseArray = function (array) {
    var resultArray = [];
    
    for (var i = 0; i < array.length; i++) {
        resultArray.unshift(array[i]);
    };
    
    return resultArray;
};

var reverseArrayInPlace = function (array) {
    var ops = array.length / 2;
    for (var i = 0; i < ops; i++) {
        var secondIdx = array.length - 1 - i;
        swapArrayItems(array, i, secondIdx);
    };
    
    return array;
};

var swapArrayItems = function (array, firstIdx, secondIdx) {
    var firstItem = array[firstIdx];
    var secondItem = array[secondIdx];
    
    // Remove first item.
    array[secondIdx] = firstItem;
    
    // Remove second item.
    array[firstIdx] = secondItem;
};

var testReverseArray = function (array) {
    console.log('Reversing array (new copy): ' + array);
    var reverseResult = reverseArray(array);
    console.log('Result: ' + reverseResult);
    
    return reverseResult;
};

var testReverseArrayInPlace = function (array) {
    console.log('Reversing array (in place): ' + array);
    var reverseResult = reverseArrayInPlace(array);
    console.log('Result: ' + reverseResult);
    
    return reverseResult;
};

testReverseArray([1,2,3]);
testReverseArray([3,2,1,0,-1]);
testReverseArray([0,2,1,3,41,5,2]);

testReverseArrayInPlace([1,2,3]);
testReverseArrayInPlace([3,2,1,0,-1]);
testReverseArrayInPlace([0,2,1,3,41,5,2]);

/*
1 2 3 4 5
5 2 3 4 1
5 4 3 2 1

1 2 3 4
2 3 4
2 3 4 1

1 2 3 4
4 2 3 1
4 3 2 1

1 2 3 4 5
2 3 4 5 1
3 4 5 1 2
4 5 1 2 3
5 1 2 3 4


*/