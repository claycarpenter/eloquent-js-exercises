
// Examples of String.replace

// Works with a string as the first argument.
console.log('papa'.replace('p', 'm'));
// > mapa

// Works with a regex as the first argument.
console.log('papa'.replace(/p/, 'm'));
// > mapa

// Global match.
console.log('papa'.replace(/p/g, 'm'));
// > mama

console.log('Borobudur'.replace(/[ou]/, 'a'));
// > Barobudur

console.log('Borobudur'.replace(/[ou]/g, 'a'));
// > Barabadar

var names = ['Hopper, Grace', 'McCarthy, John', 'Ritchie, Dennis'];
var input = names.join('\n');
// Ignoring line breaks.
console.log(input.replace(
    /([\w ]+), ([\w ]+)/g,
    '$2 $1'
));

// Requiring line breaks.
console.log(input.replace(
    /([\w ]+), ([\w ]+)(\n)/g,
    '$2 $1$3'
));

console.log('The strong and the bold.'.replace(
    /(strong|bold)/g,
    '<b>$&</b>'
));

input = 'the cia and fbi';
console.log(input.replace(
    /\b(cia|fbi)\b/g,
    function(str, first) {
        console.log(first);
        return str.toUpperCase();
    }
));

function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    
    if (amount == 1) {
        // Only one left, remove trailing 's'.
        unit = unit.replace(/s?$/, '');
    } else if (amount == 0) {
        amount = 'no';
    }
    
    return amount + ' ' + unit;
}

var stock = '1 lemon, 2 cabbages, and 101 eggs';

console.log(stock.replace(
    /(\d+) (\w+)/g,
    minusOne
));

// Greed

function stripCommentsBroken(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, '');
}

function stripCommentsWorking(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
}

console.log(stripCommentsBroken('1 + /* 2 */3'));

console.log(stripCommentsBroken('x = 10; // ten!!!'));

console.log(stripCommentsBroken('1 /* a */ + /* b */ 1'));

console.log(stripCommentsWorking('1 /* a */ + /* b */ 1'));