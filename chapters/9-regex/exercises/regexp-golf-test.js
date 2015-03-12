var testRegexModule = require('./test-regex.js'),
    Test = testRegexModule.Test,
    testRegex = testRegexModule.testRegex;

/*
    Instructions:
    
    "For each of the following items, write a regular expression to test 
    whether any of the given substrings occur in a string. The regular 
    expression should match only strings containing one of the substrings 
    described. Do not worry about word boundaries unless explicitly mentioned. 
    When your expression works, see whether you can make it any smaller."
*/

var tests;

// Challenge 1: car and cat

tests = [
    new Test('Catatonic', true),
    new Test('Carry', true),
    new Test('Cart', true),
    new Test('Cab', false),
    new Test('Tract', false),
    new Test('Carcat', true),
    new Test('Caar', false),
    new Test('Caaaat', false)
];

testRegex(/car|cat/i, tests);

testRegex(/ca[rt]/i, tests);

// Challenge 2: pop and prop

tests = [
    new Test('Prop', true),
    new Test('Pop', true),
    new Test('malapropism', true),
    new Test('popcorn', true),
    new Test('poop', false),
    new Test('proctor', false),
    new Test('p0p', false)
];

testRegex(/pr?op/i, tests);

// Challenge 3: ferret, ferry, and ferrari

tests = [
    new Test('ferret', true),
    new Test('ferry', true),
    new Test('ferrari', true),
    new Test('ferreari', false),
    new Test('ferrets', true),
    new Test('ferrous', false)
];

testRegex(/ferr(et|y|ari)/, tests);

// Challenge 4: Any word ending in ious

tests = [
    new Test('hideous', false),
    new Test('harmonious', true),
    new Test('harmoniously', false),
    new Test('harmoniously harmonious', true),
    new Test('serious', true),
    new Test('I\'m not unserious.', true),
    new Test('Imperious', true)
];

testRegex(/\b.*?ious\b/i, tests);

// Challenge 5: A whitespace character followed by a dot, comma, colon, or semicolon

tests = [
    new Test(' .', true),
    new Test(' ,', true),
    new Test(' :', true),
    new Test(' ;', true),
    new Test(' however ,', true),
    new Test(' however,', false)
];

testRegex(/\s[.,;:]/, tests);

// Challenge 6: A word longer than six letters

tests = [
    new Test('bananas', true),
    new Test('yogurt', false),
    new Test('cottage', true),
    new Test('pizza cottage', true),
    new Test('pizza pizza!', false),
    new Test('hammy', false),
    new Test('under_score', false)
];

testRegex(/\b[a-z]{7,}\b/i, tests);

// Challenge 7: A word without the letter e

tests = [
    new Test('bananas', true),
    new Test('cottage', false),
    new Test('yogurt', true),
    new Test('pizza cottage', true),
    new Test('cottage cheese', false),
    new Test('pizza pizza!', true),
    new Test('hammy', true),
    new Test('underScore', false),
    new Test('a', true)
];

testRegex(/\b[a-df-z]+?\b/i, tests);