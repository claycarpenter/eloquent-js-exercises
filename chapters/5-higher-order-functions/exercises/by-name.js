(function() {
    // byName[name] 
    var byName = function(ancestryData) {
        var nameMap = {};
        
        ancestryData.forEach(function(person) {
            nameMap[person.name] = person; 
        });
        
        return nameMap;
    };
    
    module.exports = byName;
})();