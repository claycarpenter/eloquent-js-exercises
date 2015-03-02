// console.log('The ' + this.type + ' rabbit says "' + line + '"');

var Rabbit = function (type) {
    this.type = type;
};

Rabbit.prototype.speak = function (line) {
    console.log('The ' + this.type + ' rabbit says "' + line + '"');
};

var blackRabbit = new Rabbit('Black');
blackRabbit.speak('Doom!');