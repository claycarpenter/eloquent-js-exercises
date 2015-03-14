
var months = (function() {
    var monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    
    function toName(number) {
        return monthNames[number];
    }
    
    function toNumber(name) {
        return monthNames.indexOf(name);
    }
    
    var exports = Object.create(null);
    exports.toName = toName;
    exports.toNumber = toNumber;
    
    return exports;
})();

console.log('Month at idx 1:', months.toName(1));

console.log('Month idx of \'Aug\':', months.toNumber('Aug'));