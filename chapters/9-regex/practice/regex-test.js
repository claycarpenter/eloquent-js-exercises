
var consoleRegexReporter = require('./console-regex-reporter');

consoleRegexReporter(/abc/, 'abcde');

consoleRegexReporter(/abc/, 'abxde');

consoleRegexReporter(/0123456789/, 'in 1992');

consoleRegexReporter(/[0123456789]/, 'in 1992');

consoleRegexReporter(/[0-9]/, 'in 1992');

consoleRegexReporter(/\d\d-\d\d-\d\d\d\d \d\d:\d\d/, '30-01-2003 15:20');

// Regex [^01] passes if the test string contains any characters other
// than 0 or 1.
consoleRegexReporter(/[^01]/, '1100100010100110');

consoleRegexReporter(/[^01]/, '1100100010200110');

// + indicates must be present at least once
consoleRegexReporter(/'\d+'/, "'123'");  // True
consoleRegexReporter(/'\d+'/, "''");     // False

// * indicates zero or more matches
consoleRegexReporter(/'\d*'/, "'123'");  // True
consoleRegexReporter(/'\d*'/, "''");     // True

// ? inidicates preceding component may appear zero or one times.
consoleRegexReporter(/neighbou?r/, 'neighbour');  // True
consoleRegexReporter(/neighbou?r/, 'neighbor');   // True
consoleRegexReporter(/neighbou?r/, 'neighbouur'); // False

// This can also be indicated with a range syntax:
consoleRegexReporter(/neighbou{0,1}r/, 'neighbour');  // True
consoleRegexReporter(/neighbou{0,1}r/, 'neighbor');   // True
consoleRegexReporter(/neighbou{0,1}r/, 'neighbouur'); // False

consoleRegexReporter(/\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/, '30-1-2003 8:45');

// Exact matches with range syntax:
consoleRegexReporter(/swe{2}t/, 'sweet');    // True
consoleRegexReporter(/swe{2}t/, 'sweeeeet');    // False

// Open-ended range syntax. {,3} means 0-3 times, {3,} means at least 
// 3 times.
// Note: it doesn't look like the implicit zero open-ended syntax 
// from the Elq JS book works. 
consoleRegexReporter(/swe{,3}t/, 'sweeet');  // True
consoleRegexReporter(/swe{,3}t/, 'sweet');  // True
consoleRegexReporter(/swe{,3}t/, 'sweeeet');  // False
consoleRegexReporter(/swe{2,}t/, 'sweet');   // True
consoleRegexReporter(/swe{2,}t/, 'sweeeet');   // True

// Parentheses make a group of elements act like a single element.
// Note case-insensitive match, indicated with trailing 'i' in regex.
consoleRegexReporter(/boo+(hoo+)+/i, 'Boohoooohoohooo'); // True
consoleRegexReporter(/boo+(hoo+)+/i, 'Boo'); // False
consoleRegexReporter(/boo+(hoo+)*/i, 'Boohoooohoohooo'); // True

// Test date parsing.
consoleRegexReporter(/(\d{1,2})-(\d{1,2})-(\d{4})/, '30-1-2003');
// Note that this passes (matches) the date parser regex because the
// regex isn't aware of begin or end anchor points in the string.
consoleRegexReporter(/(\d{1,2})-(\d{1,2})-(\d{4})/, '100-1-30000');

