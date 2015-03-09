(function() {
    'use strict';
    
    function InputError(message) {
        this.message = message;
        this.stack = (new Error()).stack;
    }
    InputError.prototype = Object.create(Error.prototype);
    InputError.prototype.name = 'InputError';
    
    var inputs = ['1','2','3','d',5,false,7];
    
    function getNumericValue(value) {
        var result = Number(value);
        
        if (isNaN(result)) {
            throw new InputError('Could not convert ' + value + ' into a numeric value.');
        }
        
        return result;
    }
    
    inputs.forEach(function(item) {
        try {
            var numericValue = getNumericValue(item);
            
            console.log('Numeric value: ' + numericValue);
        } catch (error) {
            if (error instanceof InputError) {
                console.log('Input Error:: ' + error.message);
            } else {
                // Unexpected error; throw.
                throw error;
            }
        } finally {
            console.log('Value: ' + numericValue);
        }
    });
})();