
for (var i = 0; i < attemptsMax; i++) {
    var failure = Math.floor(Math.random() * 2);
    
    if (failure) {
        failures++;
    } else {
        successes++;
    }
}

console.log('After ' + attemptsMax + ' attempts, successes: ' + successes + ' vs failures: ' + failures);

console.log('Success ratio: ' + (successes / attemptsMax).toFixed(3));
