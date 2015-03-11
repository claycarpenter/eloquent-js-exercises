(function() {
    function parseINI(string) {
        // Start with an object to hold the top-level fields.
        var currentSection = {name: null, fields: []};
        var categories = [currentSection];
        
        string.split(/\r?\n/).forEach(function(line) {
            var match;
            
            if (/^\s*(;.*)?$/.test(line)) {
                // Comment or blank line, do nothing.
                return;
            } else if (match = line.match(/^\[(.*)\]$/)) {
                currentSection = { name: match[1], fields: []};
                categories.push(currentSection);
            } else if (match = line.match(/^(\w+)=(.*)$/)) {
                currentSection.fields.push({name: match[1], value: match[2]});
            } else {
                throw new Error('Line \"' + line + '\" is invalid.');
            }
        });
        
        return categories;
    }
    
    module.exports = parseINI;
})();

