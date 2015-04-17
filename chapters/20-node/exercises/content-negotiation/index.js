
var http = require('http'),
    Q = require('q');

var options = {
    hostname: 'eloquentjavascript.net',
    port: 80,
    path: '/author',
    method: 'GET',
    headers: {
        'Accept': process.argv[2] || 'text/plain'
    }
};

var req = http.request(options, function (response) {
    console.log('Status:', response.statusCode);
    
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        console.log('Response body:', chunk);
    });
});

req.on('error', function (error) {
    console.error('Error:', error.toString());
});

req.end();
