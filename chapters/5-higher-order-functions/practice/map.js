(function() {
    var map = function(array, transform) {
        var results = [];
        
        array.forEach(function(item) {
           var result = transform(item);
           
           results.push(result);
        });
        
        return results;
    };
    
    module.exports = map;
})();