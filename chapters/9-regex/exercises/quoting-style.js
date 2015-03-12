
var testInput = "'It's a trap!' and 'all your base are belong to us' are overused, but I can't get them out of my mind. Even if I tell myself to 'shut up.'";

/*
Find opening quote - contents - Find closing quote (same algorithm as opening quote?)

Looking at this:
http://www.quickanddirtytips.com/education/grammar/how-to-use-quotation-marks
...leads me to believe that quotation marks could be presented in many 
different configurations.

The only quotation marks we won't use to indicate a start or end point for
a quotation are contractions (can't, it's, won't, isn't).

Contractions are indicated by a single quote surrounded by letters.

*/

//var quoteMatchPattern = /(?!\w)'(\b.*?\b)'(?!\w)/g;

//var quoteMatchPattern = /[^a-zA-Z]'(.*?)'[^a-zA-Z]/g;

var quoteMatchPattern = /(^|\s)'(.*?)'(\s|$)/g;

console.log('Matches: ' + quoteMatchPattern.test(testInput));

if (quoteMatchPattern.test(testInput)) {
    console.log('Replaced: ');
    console.log(testInput.replace(quoteMatchPattern, '$1\"$2\"$3'));
}
else { console.log('No more match.');}