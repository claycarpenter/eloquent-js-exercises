(function() {
    'use strict';
    
    var inputs = ['1','2','3','d',5,false,7];
    
    function getNumericValue(value) {
        var result = Number(value);
        
        if (isNaN(result)) {
            throw new Error('Could not convert ' + value + ' into a numeric value.');
        }
        
        return result;
    }
    
    inputs.forEach(function(item) {
        try {
            var numericValue = getNumericValue(item);
            
            console.log('Numeric value: ' + numericValue);
        } catch (error) {
            console.log('Error:: ' + error.message);
        } finally {
            console.log('Value: ' + numericValue);
        }
    });
})();