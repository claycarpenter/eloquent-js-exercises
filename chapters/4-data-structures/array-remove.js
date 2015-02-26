/*
    Eloquent Javascript - Chapter 4
    Example: Array remove
*/

var remove = function (origArray, removeIdx) {
    return origArray.slice(0, removeIdx).concat(origArray.slice(removeIdx + 1));
};

var testRemove = function (origArray, removeIdx) {
    console.log('Original array: ' + origArray);
    console.log('Removing from index ' + removeIdx + ': ' + origArray[removeIdx]);
    var updatedArray = remove(origArray, removeIdx);
    console.log('Updated array: ' + updatedArray);
};

testRemove([1,2,3,4], 0);
testRemove(['alpha','beta','parking','lot'], 3);
