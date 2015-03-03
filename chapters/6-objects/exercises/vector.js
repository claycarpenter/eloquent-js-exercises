(function() {
    var Vector = function (x, y) {
        this.x = x;
        this.y = y;
    };
    
    Vector.prototype.plus = function(vector) {
        var newX = this.x + vector.x,
            newY = this.y + vector.y;
        
        return new Vector(newX, newY);
    };
    
    Vector.prototype.minus = function(vector) {
        var newX = this.x - vector.x,
            newY = this.y - vector.y;
        
        return new Vector(newX, newY);
    };
    
    Object.defineProperty(Vector.prototype, 'length', {
        get: function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        }
    });
    
    
    
    module.exports = Vector;
})();