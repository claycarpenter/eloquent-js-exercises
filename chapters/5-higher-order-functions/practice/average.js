(function() {
    var reduce = require('./reduce');
    
    var average = function(array) {
        var add = function(a, b) {
            return a + b;    
        }; 
        
        var total = reduce(array, add);
        
        var average = total / array.length;
        
        return average;
    };
    
    module.exports = average;
})();