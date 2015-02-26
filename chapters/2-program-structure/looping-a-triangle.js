/*
Eloquent Javascript - Chapter 2
Exercise: Looping a triangle
*/

var triangleChar = '#';
var triangleLevels = 7;

for (var level = 1; level <= triangleLevels; level++) {
    var triangleLine = '';
    for (var i = 1; i <= level; i++) {
        triangleLine += triangleChar;
    }
    console.log(triangleLine);
}
