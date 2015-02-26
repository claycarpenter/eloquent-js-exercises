/*
Eloquent Javascript - Chapter 2
Exercise: Chess board
*/

// Use shift, push

var gridSize = 8;

var gridArray = [0, 1, 0, 1, 0, 1, 0, 1];

var gridCharMark = '#';
var gridCharEmpty = '_';

var rotateLine = function (line) {
    var temp = line.shift();
    line.push(temp);
}

var printLine = function (line, mark) {
    var lineText = '';
    
    for (var i = 0; i < line.length; i++) {
        var cell = line[i];
        
        lineText += cell ? gridCharMark : gridCharEmpty;
    }
    
    console.log(lineText);
}

for (var row = 0; row < gridSize; row++) {
    printLine(gridArray);
    
    rotateLine(gridArray);
}