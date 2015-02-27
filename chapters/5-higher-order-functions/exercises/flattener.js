(function() {
    var arrayConcatenator = function(arrayA, arrayB) {
        return arrayA.concat(arrayB);  
    };
    
    var flattener = function(arrayOfArrays) {
        var result = arrayOfArrays.reduce(function(prevValue, currValue, index, array) {
            return prevValue.concat(currValue);
        }, []);
        
        return result;
    };
    
    module.exports = flattener;
})();