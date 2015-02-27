module.exports = (function() {
    var every = function (array, test) {
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            
            if (!test(item)) {
                return false;
            }
        }
        
        return true;
    };
    
    var some = function (array, test) {
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            
            if (test(item)) {
                return true;
            }  
        }
        
        return false;
    };
    
    return {
        every: every,
        some: some
    }
})();