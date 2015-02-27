(function(exportable) { 
    var filter = function(array, test) {
        var results = [];
        
        array.forEach(function(item) {
            if (test(item)) {
                results.push(item);  
            }
        });
        
        return results;
    };
    
    module.exports = filter;
})(module.exports);