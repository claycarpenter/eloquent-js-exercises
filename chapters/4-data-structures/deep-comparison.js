/*
    Eloquent Javascript - Chapter 4
    Exersice: Deep comparison
*/

var isObject = function (candidate) {
    return (typeof candidate === 'object');
};

var collectPropertyNames = function (object) {
    var propertyNames = [];
    
    for (var propName in object) {
        if (object.hasOwnProperty(propName)) {
            propertyNames.push(propName);    
        }
    };
    
    return propertyNames;
};

var compareArraysShallow = function (left, right) {
    if (left.length != right.length) {
        return false;
    }
    
    for (var i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) {
            return false;
        };
    };
    
    return true;
};

var compareObjects = function (left, right) {  
    var isLeftNull = left === null;
    var isRightNull = right === null;
    
    if (isLeftNull && isRightNull) {
        return true;    
    } else if ((isLeftNull && !isRightNull) ||
               (!isLeftNull && isRightNull)) {
        return false;
    }
    
    // Collect property names for each object.
    var leftPropNames = collectPropertyNames(left);
    var rightPropNames = collectPropertyNames(right);
    
    if (leftPropNames.length != rightPropNames.length) {
        return false;  
    };
    
    // Compare property name sets.
    console.log('Comparing ' + leftPropNames + ' with ' + rightPropNames);
    var arePropertyNamesEqual = compareArraysShallow(leftPropNames, rightPropNames);
    
    if (!arePropertyNamesEqual) {
        return arePropertyNamesEqual;    
    };
    
    // Null checks out of the way, begin recursively 
    // comparing object properties.
    for (propName in left) {
        var leftPropValue = left[propName];
        var rightPropValue = right[propName];
    
        var arePropertiesEqual = deepEqual(leftPropValue, rightPropValue);
        if (!arePropertiesEqual) {
            return false;    
        }
    }
    
    return true;
};

var deepEqual = function (left, right) {
    if (isObject(left) && isObject(right)) {
        return compareObjects(left, right);
    }
    
    return left === right;
};

var testDeepEqual = function (left, right) {
    console.log('Comparing:');
    console.log('  left: ' + JSON.stringify(left));
    console.log('  right: ' + JSON.stringify(right));
    
    var areEqual = deepEqual(left, right);
    console.log('Are equal: ' + areEqual + '\n');
};

testDeepEqual(1, 1);
testDeepEqual(1, 2);

testDeepEqual(null, null);
testDeepEqual(undefined, undefined);
testDeepEqual(null, undefined);

testDeepEqual([0,1], [0,1]);
testDeepEqual([0,1,2], [0,1]);
testDeepEqual([0,1], [0,1,2]);
testDeepEqual([0,1], [1,0]);

testDeepEqual(1, null);

testDeepEqual(null, 2);

testDeepEqual(null, {});

testDeepEqual({}, null);

testDeepEqual({}, {});

testDeepEqual({name: 'Clay'}, {name: 'Clay'});

testDeepEqual({name: 'Clay'}, {name: 'Evil Clay'});

testDeepEqual({name: 'Clay', age: 33}, {name: 'Clay'});

testDeepEqual({name: 'Clay'}, {name: 'Clay', age: 33});
