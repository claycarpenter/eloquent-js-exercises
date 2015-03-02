
var speak = function(line) {
    console.log('The ' + this.type + ' rabbit says "' + line + '"');
};

var whiteRabbit = {
    type: 'white',
    speak: speak
};
var fatRabbit = {
    type: 'fat',
    speak: speak
};

whiteRabbit.speak('oh my ears and whiskers');

fatRabbit.speak('I like carrots');

speak.apply(fatRabbit, ['Burp!']);

speak.call(fatRabbit, 'Belch?');

speak.call({type: 'young'}, 'I want to run and play');
