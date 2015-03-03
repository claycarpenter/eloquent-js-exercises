var mountains = require('./mountains');

var createDataTable = function(data) {
    var keys = Object.keys(data[0]);
    
    var headers = keys.map(function(headerName) {
        return headerName; 
    });
    
    var rows = data.map(
        function(row) {
            return keys.map(
                function(key) {
                    return row[key];
                }
            );
        }
    );
    
    return {
        headers: headers,
        rows: rows
    };
};

var dataTable = createDataTable(mountains);

console.log(JSON.stringify(dataTable));

var array = [1,2,3,4];

var identityMapper = function(item) {
    return item;
};

var mappedArray = array.map(identityMapper);

console.log('Identity mapped array: ' + mappedArray);

var forEachCopier = function(targetArray) {
    return function(item) {
        targetArray.push(item);
    }
}

var copyTargetArray = [];

array.forEach(forEachCopier(copyTargetArray));

console.log('Copy target array: ' + copyTargetArray);

function colWidths(rows) {
    // Iterate over all of the columns in the first row.
    return rows[0].map(function(_, i) {
        // Collect the max widths of each column (i) inside a new array (result of map).
        return rows.reduce(function(max, row) {
            // Look at column i for every row, reducing the data down to a max width.
            return Math.max(max, row[i].minWidth());
        }, 0);
  });
}
