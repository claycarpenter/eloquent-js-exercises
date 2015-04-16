var fs = require('fs'),
    Q = require('q'),
    filePath = process.argv[2];

var fs_readFile = Q.denodeify(fs.readFile);

function convertToText (result) {
    console.log('original:', result);
    
    var text = result.toString();
    
    console.log('text:', text);
    
    return text;
}

function parseJson (jsonText) {
    var jsonObject = JSON.parse(jsonText);
    
    return jsonObject;
}

function printPersonName (person) {
    console.log('person name:', person.name);
    
    return person;
}

function printPersonTitle (person) {
    console.log('person title:', person.title);
    
    return person;
}

function errorHandler (error) {
    console.error(error.toString());
}

var promise = fs_readFile(filePath);

promise
    .then(convertToText)
    .then(parseJson)
    .then(printPersonName)
    .then(printPersonTitle)
    .catch(errorHandler);

