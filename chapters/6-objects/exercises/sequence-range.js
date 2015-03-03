(function() {
    var ArraySequence = require('./sequence-array');
    
    var RangeSequence = function (from, to) {
        ArraySequence.call(this, []);
        
        for (var i = from; i <= to; i++) {
            this.array.push(i);    
        }
    };
    RangeSequence.prototype = Object.create(ArraySequence.prototype);
    
    module.exports = RangeSequence;
})();