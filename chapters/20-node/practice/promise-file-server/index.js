
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime'),
    Q = require('q');

// Simple Promise wrapper around fs.stat.
function stat (path) {
    var deferred = Q.defer();
    
    fs.stat(path, function (error, stats) {
        if (error) {
            // Fail, reject promise.
            deferred.reject(error);
        } else {
            // Success, resolve promise.
            deferred.resolve(stats);
        }
    });
    
    return deferred.promise;
}

// Simple Promise wrapper around fs.readdir
function readdir (path) {
    var deferred = Q.defer();
    
    fs.readdir(path, function (error, files) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(files);
        }
    });
    
    return deferred.promise;
}

// Create an entirely blank object.
// Removing the default object properties ensures that only the method handlers
// we define here will be available to requesting clients.
var methodHandlers = Object.create(null);

// GET method handler.
methodHandlers.GET = function (path, respond) {
    // Get information about the targeted resource on the local file system, 
    // including whether that file exists.
    var statPromise = stat(path);
    
    statPromise
        .then(function (stats) {
            if (stats.isDirectory()) {
                // Targeted resource is a directory, return file list.
                var readdirPromise = readdir(path);
                readdirPromise
                    .then(function (files) {
                        respond(200, files.join('\n'));
                    })
                    .catch(function (error) {
                        respond(500, error.toString());
                    });
            } else {
                // Targeted resource is a file, return file contents.
                var contentType = mime.lookup(path),
                    readStream = fs.createReadStream(path);
                
                respond(200, readStream, contentType);
            }
        })
        .catch(function (error) {
            if (error.code === 'ENOENT') {
                // File for resource could not be found, respond with 404.
                respond(404, 'File not found');
            } else {
                // Generic server error.
                respond(500, error.toString());
            } 
        });
};

// DELETE method handler.
methodHandlers.DELETE = function (path, respond) {
    fs.stat(path, function (error, stats) {
        if (error && error.code === 'ENOENT') {
            // 204 - No Content
            respond(204);
        } else if (error) {
            respond(500, error.toString());
        } else if (stats.isDirectory()) {
            fs.rmdir(path, respondErrorOrNothing(respond));
        } else {
            fs.unlink(path, respondErrorOrNothing(respond));   
        }
    });
};

// PUT method handler.
methodHandlers.PUT = function (path, respond, request) {
    var outStream = fs.createWriteStream(path);

    // Listen for error events.
    outStream.on('error', function (error) {
        // Send 500 - Server Error in response to file write errors.
        respond(500, error.toString());
    });
    
    outStream.on('finish', function (error) {
        // Send 204 - No Content in response to successful PUTs.
        respond(204); 
    });
    
    // Begin sreaming the request body to the output resource.
    request.pipe(outStream);
};

function respondErrorOrNothing (respond) {
    return function (error) {
        if (error) {
            respond(500, error.toString());
        } else {
            // 204 - No Content
            respond(204);
        }
    };
}

function serverEngine (request, response) {
    // Generic response wrapper.
    function respond (statusCode, body, type) {
        // Set a default content-type of text/plain, if none is provided.
        type = typeof type !== 'undefined' ? type : 'text/plain';
        
        // Write the content-type header.
        response.writeHead(statusCode, {'Content-Type': type});
        
        // If the body is a stream, pipe it to the response.
        if (body && body.pipe) {
            body.pipe(response);
        } else {
            // Otherwise, just write the body as it is (expecting text?)
            response.end(body);
        }
    }
    
    console.log('Incoming request:', request.method, 'for resource', request.url);
    
    if (request.method in methodHandlers) {
        var path = urlToPath(request.url);
        
        methodHandlers[request.method](path, respond, request);
    } else {
        // Send back a request error message.
        respond(405, 'Method ' + request.method + ' not allowed.');
    }
}

function urlToPath (requestUrl) {
    var path = url.parse(requestUrl).pathname;
    
    return '.' + decodeURIComponent(path);
}

// Create and start the server.
var server = http.createServer(serverEngine),
    host = process.env.IP || 'localhost',
    port = process.env.PORT || 8080;

server.listen(port, host);

console.log('Server listening on', host + ':' + port);
