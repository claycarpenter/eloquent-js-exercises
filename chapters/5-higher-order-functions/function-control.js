(function(exportable) {
    
    var ifFalse = function(test, action) {
        if (!test) {
            action();
        }
    }
    
    var ifTrue = function(test, action) {
        if (test) {
            action();
        }
    }
    
    exportable.ifFalse = ifFalse;
    exportable.ifTrue = ifTrue;
})(module.exports);