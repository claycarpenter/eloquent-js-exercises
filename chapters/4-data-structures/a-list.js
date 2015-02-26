/*
    Eloquent Javascript - Chapter 4
    Exersice: A list
*/

var prepend = function (list, newElement) {
    var list = {
        value: newElement,
        next: list
    };
    
    return list;
};

var nth = function (list, index) {
    if (!list) {
        return;
    }
    
    if (index === 0) {
        return list.value;    
    }
    
    return nth(list.next, index - 1);
};

var arrayToList = function (array) {
    if (!array.length) {
        return undefined;    
    }
    
    var list = {
        value: array[0]
    };
    
    if (array.length) {
        var remaining = array.splice(1);
        
        list.next = arrayToList(remaining);
    }
    
    return list;
};

var listToArray = function (list) {
    var array = [];
    
    var current = list;
    do {
        array.push(current.value);
     
        current = current.next;
    } while (current);
    
    return array;
};

var printList = function (list) {
    var outBuffer = listToArray(list);
    
    console.log('List: ' + outBuffer.join(' -> '));
};

var testArrayToList = function (array) {
    var list = arrayToList(array);
    
    printList(list);
};

var testListToArray = function () {
};

var testPrepend = function (array, newElement) {
    var list = arrayToList(array);
    
    console.log('Original list: ');
    printList(list);
    
    list = prepend(list, newElement);
    
    console.log('Updated list: ');
    printList(list);
};

var testNth = function (array, index) {
    var list = arrayToList(array);
    console.log('List: ');
    printList(list);
    
    var value = nth(list, index);
    console.log('Value at position ' + index + ': ' + value);
};

testArrayToList([1,2,3]);
testArrayToList([5,4,3,2,1]);

testPrepend([1,2,3], 0);

testPrepend([-3,-2,-1], 0);

testNth([1,2,3,4,5], 0);
testNth([1,2,3,4,5], 2);
testNth([1,2,3,4,5], 5);

