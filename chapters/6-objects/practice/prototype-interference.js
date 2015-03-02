
var map = {
    'alpha': 6,
    'beta': 12
};

Object.prototype.enumProp = 'enumerable';

Object.defineProperty(map, 'nonEnumProp', 
    {
        enumerable: false, 
        value: 'nonenumerable'
    }
);

// Lists alpha, beta, enumProp
console.log('List all keys in map');
for (var key in map) {
    console.log('Map key "' + key + '": ' + map[key]);
}

// nonEnumProp is still in map, just not visible to key iteration.
console.log('nonEnumProp in map: ' + ('nonEnumProp' in map));

// Lists only alpha, beta
console.log('List all keys owned by map');
for (var key in map) {
    if (map.hasOwnProperty(key))
        console.log('Map key "' + key + '": ' + map[key]);
}

