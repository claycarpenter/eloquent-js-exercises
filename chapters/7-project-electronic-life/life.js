var plan = ["############################",
            "#     ~#~   #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
};

function Grid(width, height) {
    this.space = new Array(width * height);
    
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height;
};
Grid.prototype._getSpaceIndex = function(vector) {
    return vector.x + this.width * vector.y;  
};
Grid.prototype.get = function(vector) {
    return this.space[this._getSpaceIndex(vector)];
};
Grid.prototype.set = function(vector, value) {
    this.space[this._getSpaceIndex(vector)] = value;
};
Grid.prototype.forEach = function(func, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.get(new Vector(x, y));
            
            if (value) {
                func.call(context, value, new Vector(x, y));            
            }
        }
    }
};

var grid = new Grid(5, 5);
console.log(grid.get(new Vector(1,1)));
grid.set(new Vector(1,1), 'X');
console.log(grid.get(new Vector(1,1)));


var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};
var directionNames = Object.keys(directions);

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function BouncingCritter() {
    this.direction = randomElement(Object.keys(directions));
}
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != ' ') {
        this.direction = view.find(' ') || 's';
    }
    
    return {
        type: 'move',
        direction: this.direction
    };
};

function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    
    return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
    this.dir = 's';
}
WallFollower.prototype.act = function(view) {
    var start = this.dir;
    
    if (view.look(dirPlus(this.dir, -3)) != ' ') {
        start = this.dir = dirPlus(this.dir, -2);
    }
    
    while (view.look(this.dir) != ' ') {
        this.dir = dirPlus(this.dir, 1);
        
        if (this.dir == start) {
            break;
        }
    }
    
    return {
        type: 'move',
        direction: this.dir
    };
};

function Wall() {}

function Plant() {
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(context) {
    if (this.energy > 15) {
        var space = context.find(' ');
        
        if (space) {
            return {
                type: 'reproduce',
                direction: space
            };
        }
    }
    
    if (this.energy < 20) {
        return {
            type: 'grow'
        };
    }
}

function PlantEater() {
    this.energy = 20;
}
PlantEater.prototype.act = function(context) {
    var space = context.find(' ');
    if (this.energy > 60 && space) {
        return {
            type: 'reproduce',
            direction: space
        };
    }
    
    var plant = context.find('*');
    
    if (plant) {
        return {
            type: 'eat',
            direction: plant
        };
    }
    
    if (space) {
        return {
            type: 'move',
            direction: space
        };
    }
};

function elementFromChar(legend, ch) {
    if (ch == ' ') {
        return null;
    }
    
    //console.log('Creating element from char: ' + ch + ' against legend ' + JSON.stringify(legend));
    
    var element = new legend[ch]();
    element.originChar = ch;
    
    return element;
}
function charFromElement(element) {
    //console.log('Pulling char from element: ' + JSON.stringify(element));
    
    if (element == null) {
        return ' ';
    }
    
    return element.originChar;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    
    this.legend = legend;
    
    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++) {
            var position = new Vector(x, y);
            var element = elementFromChar(legend, line[x]);
            
            var charValue = (element) ? element.originChar : '[null]';
            //console.log('Putting ' + charValue + ' at ' + position);
        
            this.grid.set(position, element);
        } 
    }.bind(this));
}
World.prototype.toString = function() {
    var output = '';
    
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        
        output += '\n';
    }
    
    return output;
};
World.prototype.turn = function() {
    var acted = [];
    
    this.grid.forEach(function(critter, vector) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            
            this.letAct(critter, vector);
        }
    }, this);
};
World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    
    if (action && action.type == 'move') {
        var dest = this.checkDestination(action, vector);
        
        if (dest && this.grid.get(dest) == null) {
            // Valid move.
            
            // Clear previous location.
            this.grid.set(vector, null);
            
            // Set critter in new location.
            this.grid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) {
            return dest;
        }
    }    
};

function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

// Create a blank object that has no prototype to avoid any interference.
var actionTypes = Object.create(null);
actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    
    return true;
};
actionTypes.move = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    
    if (dest == null || critter.energy <= 1 || this.grid.get(dest) != null) {
        return false;
    }
    
    critter.energy -= 1;
    
    this.grid.set(vector, null);
    this.grid.set(dest, critter);
    
    return true;
};
actionTypes.eat = function(critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    
    var atDest = (dest != null && this.grid.get(dest));
    
    if (!atDest || atDest.energy == null) {
        return false;
    }
    
    critter.energy += atDest.energy;
    
    this.grid.set(dest, null);
    
    return true;
};
actionTypes.reproduce = function(critter, vector, action) {
    var baby = elementFromChar(this.legend, critter.originChar);
    
    var dest = this.checkDestination(action, vector);
    
    if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) {
        return false;
    }
    
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    
    return true;
};

LifelikeWorld.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action && 
            action.type in actionTypes &&
            actionTypes[action.type].call(
                this, critter, vector, action);
    
    if (!handled) {
        critter.energy -= 0.2;
        
        if (critter.energy <= 0) {
            // Creature is out of energy, remove.
            this.grid.set(vector, null);
        }
    }
};



function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    
    if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    }
    
    return '#';
};
View.prototype.findAll = function(ch) {
    var found = [];
    
    for (var dir in directions) {
        if (this.look(dir) == ch) {
            found.push(dir);
        }
    }
    
    return found;
};
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    
    if (!found.length) {
        return null;
    }
    
    return randomElement(found);
};


/* 
Old World
*/

/*
var legend = {
    "#": Wall,
    "~": WallFollower,
    "o": BouncingCritter
};

var world = new World(plan, legend);

console.log('World:\n\n' + world.toString());

for (var i = 0; i < 5; i++) {
    world.turn();
    
    console.log(world.toString());
}
*/

var valley = new LifelikeWorld(
  ["############################",
   "#####                 ######",
   "##   ***                **##",
   "#   *##**         **  O  *##",
   "#    ***     O    ##**    *#",
   "#       O         ##***    #",
   "#                 ##**     #",
   "#   O       #*             #",
   "#*          #**       O    #",
   "#***        ##**    O    **#",
   "##****     ###***       *###",
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant}
);

for (var i = 0; i < 200; i++) {
    valley.turn();
    
    console.log(valley.toString());
}

console.log('\nDone.\n');