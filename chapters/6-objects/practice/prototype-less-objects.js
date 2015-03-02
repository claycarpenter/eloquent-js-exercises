
var map = Object.create(null);
map['alpha'] = 6;
map['beta'] = 12;

// Lists only alpha, beta
console.log('List all keys in map');
for (var key in map) {
    console.log('Map key "' + key + '": ' + map[key]);
}

// map has no other properties, including typical Object defaults
// like toString
console.log('toString in map: ' + ('toString' in map));
