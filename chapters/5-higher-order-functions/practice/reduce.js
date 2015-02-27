(function() {
    var reduce = function(array, combine, start) {
        var current = start || array[0],
            idx = start ? 0 : 1;
        
        for (; idx < array.length; idx++) {
            var item = array[idx];
            
            current = combine(current, item);
        }
        
        return current;
    };
    
    module.exports = reduce;
})();