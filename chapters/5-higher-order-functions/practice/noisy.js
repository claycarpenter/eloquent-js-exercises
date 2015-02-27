(function(exportable) {
    var preCallMsgPrefix = 'calling with: ',
        postCallMsgPrefix = 'returned value: ';
    
    // Only allows for a single argument.
    var simple = function(func, msgBuffer) {
        return function(arg) {
            msgBuffer.push(preCallMsgPrefix + arg);
            
            var result = func(arg);
            
            msgBuffer.push(postCallMsgPrefix + result);
            
            return result;
        };
    };
    
    // Allows for a flexible number of arguments.
    var flexible = function(func, msgBuffer) {
        return function() {
            msgBuffer.push(preCallMsgPrefix + JSON.stringify(arguments));
            
            var result = func.apply(null, arguments);
            
            msgBuffer.push(postCallMsgPrefix + result);
            
            return result;
        };
    };
    
    exportable.simple = simple;
    exportable.flexible = flexible;
    exportable.preCallMsgPrefix = preCallMsgPrefix;
    exportable.postCallMsgPrefix = postCallMsgPrefix;
})(module.exports);