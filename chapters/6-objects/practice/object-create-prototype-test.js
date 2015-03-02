
var protoRabbit = {
    type: 'Regular',
    speak: function (line) {
        console.log('The ' + this.type + ' rabbit says "' + line + '"');
    }
};

var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('Die!');

var normalRabbit = Object.create(protoRabbit);
normalRabbit.speak('Nothing doing');
