'use strict';

var names = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

function number(name) {
    return names.indexOf(name);
}

function name(number) {
    return names[number];
}

module.exports = {
    number: number,
    name: name
};