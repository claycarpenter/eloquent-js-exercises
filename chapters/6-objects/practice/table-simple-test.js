var mountains = require('./mountains');

function rowHeights(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight());    
        }, 0);    
    });
}

function colWidths(rows) {
    // Iterate over all of the columns in the first row.
    return rows[0].map(function(_, columnIdx) {
        // Collect the max widths of each column inside a new array 
        // (result of map).
        return rows.reduce(function(max, row) {
            // Look at column i for every row, reducing the data down 
            // to a max width.
            return Math.max(max, row[columnIdx].minWidth());
        }, 0);
  });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);
    
    /*
        Combines the specified line of each block together into a 
        single string.
        
        e.g.:
        drawLine([['Title','-----'], ['Name','----']], 0) 
        
        returns 'Title Name'
    */
    function drawLine(blocks, lineNo) {
        return blocks.map(function(block) {
            return block[lineNo];
        }).join(' ');
    };
    
    function drawRow(row, rowNum) {
        /*
            For each cell in the row, render the cell into a new array 
            (or block) containing each line of text.
            
                ['Joe'] or ['Title','-----']        
            
            All blocks in the row have the same height, for example:
            
                [['Joe'], ['Jane']]
                
                [['Title','-----'], ['Name','----']]
             
            Returns a new array (of arrays) that holds all rendered blocks.
        */
        var blocks = row.map(function(cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        
        // Iterates over lines of the first block, collecting
        // all of the items for each line across the blocks.
        return blocks[0].map(function(_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join('\n');
    };
    
    return rows.map(drawRow).join('\n');
}


function repeat(string, times) {
    var result = '';
    
    for (var i = 0; i < times; i++) {
        result += string;
    }
    
    return result;
}

function TextCell(text) {
    this.text = text.split('\n');
}

TextCell.prototype.minWidth = function () {
    // Iterate over each line in this cell's content, looking for
    // the longest line (and returning that value).
    var min = this.text.reduce(function(width, line) {
        return Math.max(width, line.length); 
    }, 0);
    
    return min;
};

TextCell.prototype.minHeight = function() {
    return this.text.length;
};

TextCell.prototype.draw = function (width, height) {
    var result = [];
    
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || '';
        result.push(line + repeat(' ', width - line.length));
    }
    
    return result;
};


function UnderlineCell(inner) {
    this.inner = inner;
}
UnderlineCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};
UnderlineCell.prototype.minHeight = function() {
    return this.inner.minHeight();
};
UnderlineCell.prototype.draw = function (width, height) {
    var innerCellDraw = this.inner.draw(width, height);
    
    var drawResult = innerCellDraw.concat([repeat('-', width)]);
    
    return drawResult;
};

function RTextCell (text) {
    TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function (width, height) {
    var result = [];
    
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || '';
        result.push(repeat(' ', width - line.length) + line);
    }
    
    return result;
};

function StretchCell (inner, width, height) {
    this.inner = inner;
    
    this.width = width;
    this.height = height;
}
StretchCell.prototype.minWidth = function () {
    return Math.max(this.width, this.inner.minWidth());
}
StretchCell.prototype.minHeight = function () {
    return Math.max(this.height, this.inner.minHeight());
}
StretchCell.prototype.draw = function (width, height) {
    return this.inner.draw(width, height);
}

function createTable () {
    var rows = [];
    for (var i = 0; i < 5; i++) {
        var row = [];
        
        for (var j = 0; j < 5; j++) {
            if ((j + i) % 2 == 0) {
                row.push(new TextCell('##'));
            } else {
                row.push(new TextCell('  '));
            }
        }
        
        rows.push(row);
    }
    
    return rows;
}

console.log(drawTable(createTable()));


function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
        return new UnderlineCell(new TextCell(name)); 
    });
    
    var body = data.map(function(row) {
        return keys.map(function(key) {
            var cell;
            var value = row[key];
            
            if (typeof value === 'number') {
                cell = new RTextCell(String(value));    
            } else {
                cell = new StretchCell(
                    new TextCell(String(value)), 15, 2);
            }
            
            return cell;
        });  
    });
    
    return [headers].concat(body);
}

var mountainsDataTable = dataTable(mountains);
console.log('\n\n');
console.log(drawTable(mountainsDataTable));
