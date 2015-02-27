(function(exportable) {
    var forEach = function(array, action) {
      for (var i = 0; i < array.length; i++) {
          var item = array[i];
          
          action(item);
      }  
    };
    
    module.exports = forEach;
})(module.exports);