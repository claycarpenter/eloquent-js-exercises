(function () {
    var ArraySequence = function (array) {
        this.array = array;
        this.currIdx = 0;
    };
    
    // .next()
    ArraySequence.prototype.next = function () {
        // Retrieve current item.
        var item = this.array[this.currIdx];
        
        // Point current index to next item.
        this.currIdx++;
        
        return item;
    };
    
    // .hasNext()
    ArraySequence.prototype.hasNext = function () {
        return this.currIdx < this.array.length;  
    };
    
    module.exports = ArraySequence;
})();