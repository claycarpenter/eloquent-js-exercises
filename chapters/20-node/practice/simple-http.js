
var http = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type': 'text/html'});
    
    response.write('<h1>Hello!</h1><p>You asked for <code>' + request.url + '</code></p>');
    
    response.end();
});

// Start the server.
server.listen(process.env.PORT);

console.log('Server listening on port', process.env.PORT);
