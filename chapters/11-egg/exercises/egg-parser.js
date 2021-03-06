
function parseExpression(program) {
    program = skipSpace(program);
    
    var match, expr;
    
    if (match = /^"([^"]*)"/.exec(program)) {
        expr = {
            type: 'value',
            value: match[1]
        };
    } else if (match = /^\d+\b/.exec(program)) {
        expr = {
            type: 'value',
            value: Number(match[0])
        };
    } else if (match = /^[^\s(),"]+/.exec(program)) {
        expr = {
            type: 'word',
            name: match[0]
        };
    } else {
        throw new SyntaxError('Unexpected syntax: ' + program);
    }
    
    return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
    program = skipSpace(program);
    
    if (program[0] != '(') {
        return {
            expr: expr,
            rest: program
        };
    }
    
    program = skipSpace(program.slice(1));
    expr = {
        type: 'apply',
        operator: expr,
        args: []
    };
    
    while (program[0] != ')') {
        var arg = parseExpression(program);
        
        expr.args.push(arg.expr);
        
        program = skipSpace(arg.rest);
        
        if (program[0] == ',') {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ')') {
            throw new SyntaxError('Expected \',\' or \')\'');
        }
    }
    
    return parseApply(expr, program.slice(1));
}

function evaluate(expr, env) {
    switch(expr.type) {
        case 'value':
            return expr.value;
        
        case 'word':
            if (expr.name in env) {
                return env[expr.name];
            } else {
                throw new ReferenceError('Undefined variable: ' + expr.name);
            }
            
        case 'apply':
            if (expr.operator.type == 'word' && expr.operator.name in specialForms) {
                return specialForms[expr.operator.name](expr.args, env);
            }
            
            var op = evaluate(expr.operator, env);
            
            if (typeof op != 'function') {
                throw new TypeError('Applying a non-function.');
            }
            
            var applyArgs = expr.args.map(function(arg) {
                return evaluate(arg, env);
            });
            
            return op.apply(null, applyArgs);
    }
}

function skipSpace(string) {
    // '        # Some comment... '
    
    // console.log('Skip space operating on: \"' + string + '\"');
    
    var test = string.replace(/^\s*(#.*?\n)?/, '');
    
    // console.log('Test: \"' + test + '\"');
    
    return test;
    
    // var first = string.search(/\S/);
    
    // if (first == -1) {
    //     return '';
    // }
    
    // return string.slice(first);
}

function parse(program) {
    var result = parseExpression(program);
    
    if (skipSpace(result.rest).length > 0) {
        throw new SyntaxError('Unexpected text after program : \"' + result.rest + '\"');
    }
    
    return result.expr;
}

var specialForms = Object.create(null);

specialForms['if'] = function(args, env) {
    if (args.length != 3) {
        throw new SyntaxError('Bad number of args to if');
    }
    
    if (evaluate(args[0], env) !== false) {
        return evaluate(args[1], env);
    } else {
        return evaluate(args[2], env);
    }
};

specialForms['while'] = function(args, env) {
    if (args.length != 2) {
        throw new SyntaxError('Bad number of args to while');
    }
    
    while (evaluate(args[0], env) !== false) {
        evaluate(args[1], env);
    }
    
    return false;
};

specialForms['do'] = function(args, env) {
    var value = false;
    
    args.forEach(function(arg) {
        value = evaluate(arg, env);
    });

    return value;
};

specialForms['define'] = function(args, env) {
    if (args.length != 2 || args[0].type != 'word') {
        throw new SyntaxError('Bad use of define');
    }
    
    var value = evaluate(args[1], env);
    env[args[0].name] = value;
    
    return value;
};

specialForms['set'] = function(args, env) {
    if (args.length != 2 || args[0].type != 'word') {
        throw new SyntaxError('Bad use of define');
    }
    
    // Evaluate the value for the variable.
    var value = evaluate(args[1], env);
    
    var name = args[0].name;
    
    // Determine the appropriate scope for the variable.
    var scope = env;
    
    while (
        scope != null && 
        !Object.prototype.hasOwnProperty.call(scope, name)) {
        scope = Object.getPrototypeOf(scope);
    }
    
    if (scope == null) {
        throw new ReferenceError('Cannot locate variable \"' + name + '\" in any parent scope.');
    }
    
    // Update the value of the variable in the correct scope.
    scope[name] = value;
    
    return value;
};

specialForms['fun'] = function(args, env) {
    if (!args.length) {
        throw new SyntaxError('Functions need a body');
    }  
    
    function name(expr) {
        if (expr.type != 'word') {
            throw new SyntaxError('Arg names must be words');
        }
        
        return expr.name;
    }
    
    var argNames = args.slice(0, args.length - 1).map(name);
    var body = args[args.length - 1];
    
    return function() {
        if (arguments.length != argNames.length) {
            throw new TypeError('Wrong number of arguments');
        }
        
        var localEnv = Object.create(env);
        
        for (var i = 0; i < arguments.length; i++) {
            localEnv[argNames[i]] = arguments[i];
        }
        
        return evaluate(body, localEnv);
    };
};

// Create a global environment that has no parent object.
var topEnv = Object.create(null);

topEnv['true'] = true;
topEnv['false'] = false;

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
  topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

topEnv['print'] = function(value) {
    console.log(value);
    
    return value;
};

topEnv['array'] = function() {
    console.log('Array contents:', arguments);
    
    var newArray = [];
    
    for (var i = 0, x = arguments.length; i < x; i++) {
        newArray.push(arguments[i]);
    }
    
    return newArray;  
};

topEnv['length'] = function(array) {
    if (!(array instanceof Array)) {
        throw new SyntaxError('Cannot call length on non-Array object.');   
    }
    
    return array.length;
};

topEnv['element'] = function(array, index) {
    if (!(array instanceof Array)) {
        throw new SyntaxError('Cannot call length on non-Array object.');   
    }
    
    return array[index];
}

function run(program, options) {
    var env = Object.create(topEnv);
    
    var syntaxTree = parse(program);
    
    if (options && options.printSyntaxTree) {
        console.log(syntaxTree);
    }
    
    return evaluate(syntaxTree, env);
}

module.exports = {
    run: run
};

/*
console.log(parse('fred(a)'));

run("do(define(total, 0),",
    "   define(count, 1),",
    "   while(<(count, 11),",
    "         do(define(total, +(total, count)),",
    "            define(count, +(count, 1)))),",
    "   print(total))");

run("do(define(plusOne, fun(a, +(a, 1))),",
    "   print(plusOne(10)))");

run("do(define(pow, fun(base, exp,",
    "     if(==(exp, 0),",
    "        1,",
    "        *(base, pow(base, -(exp, 1)))))),",
    "   print(pow(2, 10)))");
*/