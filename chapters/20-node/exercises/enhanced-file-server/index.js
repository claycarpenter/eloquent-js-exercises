
var http = require('http'),
    fsp = require('./fsp'),
    fs = require('fs'),
    url = require('url'),
    mime = require('mime'),
    publicDirName = './public';

var pathUtils = Object.create(null);

(function(exportable) {
    var path = require('path'),
        publicDirPath = path.resolve(publicDirName),
        relPathRegex = /^\.\./;
    
    exportable.isSafePath = function isSafePath (testPath) {
        var resolvedPath = path.resolve(testPath),
            relativePath = path.relative(publicDirPath, resolvedPath);
        
        return !relPathRegex.test(relativePath);
    };
})(pathUtils);

// Create an entirely blank object.
// Removing the default object properties ensures that only the method handlers
// we define here will be available to requesting clients.
var methodHandlers = Object.create(null);

// GET method handler.
methodHandlers.GET = function (path, respond) {
    // Get information about the targeted resource on the local file system, 
    // including whether that file exists.
    var statPromise = fsp.stat(path);
    
    statPromise
        .then(function (stats) {
            if (stats.isDirectory()) {
                // Targeted resource is a directory, return file list.
                var readdirPromise = fsp.readdir(path);
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
    var statPromise = fsp.stat(path);
    statPromise
        .then(function (stats) {
            if (stats.isDirectory()) {
                // TODO: Wrap with promise?
                fs.rmdir(path, respondErrorOrNothing(respond));
            } else {
                // TODO: Wrap with promise?
                fs.unlink(path, respondErrorOrNothing(respond));   
            }
        })
        .catch(function (error) {
            if (error.code === 'ENOENT') {
                // 204 - No Content
                respond(204);
            } else {
                respond(500, error.toString());
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
        
        try {
            var path = urlToPath(request.url);
        } catch (error) {
            respond(400, error.toString());
            
            return;
        }
        
        console.log('Converting url', request.url, 'to path', path);
        
        methodHandlers[request.method](path, respond, request);
    } else {
        // Send back a request error message.
        respond(405, 'Method ' + request.method + ' not allowed.');
    }
}

function urlToPath (requestUrl) {
    var urlPath = url.parse(requestUrl).pathname;
    var path = publicDirName + '/' + decodeURIComponent(urlPath);
    
    if (!pathUtils.isSafePath(path)) {
        throw new Error('File not found');
    }
    
    return require('path').resolve(path);
}

// Create and start the server.
var server = http.createServer(serverEngine),
    host = process.env.IP || 'localhost',
    port = process.env.PORT || 8080;

server.listen(port, host);

console.log('Server listening on', host + ':' + port);
