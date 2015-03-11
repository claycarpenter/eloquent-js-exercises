var consoleRegexReporter = require('./console-regex-reporter');

// Matches
consoleRegexReporter(/(\d{1,2})-(\d{1,2})-(\d{4})/, '30-1-2003');

// Matches
consoleRegexReporter(/(\d{1,2})-(\d{1,2})-(\d{4})/, '100-1-30000');

// Fails, now that regex is aware of start and end of input string.
consoleRegexReporter(/^(\d{1,2})-(\d{1,2})-(\d{4})$/, '100-1-30000');

// Match any string with all digits.
consoleRegexReporter(/^\d+$/, '30000');     // Yup
consoleRegexReporter(/^\d+$/, '30000929492944809');     // Yup
consoleRegexReporter(/^\d+$/, '30000a2294');    // Nope

/*
    Word Boundaries
*/
consoleRegexReporter(/cat/, 'concatenate'); // Yup
consoleRegexReporter(/\bcat\b/, 'concatenate'); // Nope
consoleRegexReporter(/\bcat\b/, 'cat'); // Yup

/*
    Choice patterns
*/
consoleRegexReporter(/\d+ (pig|chicken|cow)s?\b/, '15 pigs'); // Yup
consoleRegexReporter(/\d+ (pig|chicken|cow)s?\b/, '15 pigchickens');  // Nope
consoleRegexReporter(/\d+ (pig|chicken|cow)s?/, '15 pigchickens');  // Yup
consoleRegexReporter(/\d+ (pig|chicken|cow)s?/, '15 chickenpigs');  // Yup
consoleRegexReporter(/\d+ (pig|chicken|cow)s?\b/, '150 cats');    // Nope
consoleRegexReporter(/\d+ (pig|chicken|cow)s?\b/, '1 cow');    // Yup
consoleRegexReporter(/\d+ (pig|chicken|cow)s?\b/, 'cats 150');    // Nope

// Matches binary, decimal, hexadecimal numbers:
// 0101b - binary
// 1003 - decimal
// bad01h - hexadecimal
consoleRegexReporter(/\b([01]+b|\d+|[\da-f]+h)\b/, '0101b');    // Yup
consoleRegexReporter(/\b([01]+b|\d+|[\da-f]+h)\b/, '0102b');    // Nope

consoleRegexReporter(/\b([01]+b|\d+|[\da-f]+h)\b/, '1003');    // Yup

consoleRegexReporter(/\b([01]+b|\d+|[\da-f]+h)\b/, 'bad01h');    // Yup
consoleRegexReporter(/\b([01]+b|\d+|[\da-f]+h)\b/, 'bad01');    // Nope

