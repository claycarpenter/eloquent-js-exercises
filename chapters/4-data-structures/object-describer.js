/*
    Eloquent Javascript - Chapter 4
    Example: Object describer
*/

var createPropertyList = function (object) {
    var propertyList = [];
    
    for (var propertyName in object) {
        var propertyValue = object[propertyName];
        
        var propertyEntry = {
            name: propertyName,
            value: propertyValue
        };
        
        propertyList.push(propertyEntry);
    }
    
    return propertyList;
};

var testDescribeObject = function (object) {
    console.log("{");
    
    var objectPropertyList = createPropertyList(object);
    
    for (var i = 0; i < objectPropertyList.length; i++) {
        var propertyEntry = objectPropertyList[i];
        console.log('  \"' + propertyEntry.name + '\" -> ' + propertyEntry.value);
    }
    
    console.log("}");
};

testDescribeObject({name: 'Clay'});
testDescribeObject({1: 2, 3: 4});
testDescribeObject({age: 39, name: 'John Johnson', title: undefined, wage: null});