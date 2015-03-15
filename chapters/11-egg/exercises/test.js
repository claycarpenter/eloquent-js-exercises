// test.js

var topEnv = Object.create(null);

topEnv['array'] = function() {
    console.log('Array contents:', arguments);
    
    var newArray = [];
    
    for (var i = 0, x = arguments.length; i < x; i++) {
        newArray.push(arguments[i]);
    }
    
    return newArray;  
};

var args = [1,2,3];

var result = topEnv['array'].apply(null, args);

console.log(result);
