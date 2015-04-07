
module.exports = function (string) {
    var characters = string.split('');
    
    var garbledCharacters = characters.map(function (char) {
        return String.fromCharCode(char.charCodeAt(0) + 5);
    });
    
    return garbledCharacters.join('');
}