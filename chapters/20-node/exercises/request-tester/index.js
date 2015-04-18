// Request-tester

var rp = require('request-promise');

var options = {
    url: process.argv[2] || 'http://localhost:8080/',
    method: process.argv[3] || 'GET',
    headers: {
        'Accept': 'text/plain'
    }
};

console.log('Retrieving', options.url);

rp(options)
    .then(console.log)
    .catch(console.error);
