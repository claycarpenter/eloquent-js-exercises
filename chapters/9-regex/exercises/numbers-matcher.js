var testRegexModule = require('./test-regex.js'),
    Test = testRegexModule.Test,
    testRegex = testRegexModule.testRegex;

var numberMatchPattern = /^-?(0x[0-9a-f]+|(\d+\.\d+|\d+\.|\.?\d+)(e-?\d+)?|NaN|Infinity)$/i;


var tests = [
    new Test('345', true),
    new Test('34.5', true),
    new Test('3.45e2', true),
    new Test('3.45e', false),
    new Test('0.94', true),
    new Test('-0.94', true),
    new Test('0377', true),
    new Test('0xFF', true),
    new Test('5e-3', true),
    new Test('1E10', true),
    new Test('.5', true),
    new Test('Infinity', true),
    new Test('-Infinity', true),
    new Test('-Infinitys', false),
    new Test('NaN', true),
    new Test('NaNo', false),
    new Test('.', false)
];

testRegex(numberMatchPattern, tests);