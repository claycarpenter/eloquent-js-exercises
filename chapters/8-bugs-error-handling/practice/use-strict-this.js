(function() {
    // Works without strict mode.
    // If this constructor is called without the 'new' operator,
    // this will refer to the global scope object.
    function Person(name) {
        this.name = name;
    }
    
    // Note missing 'new' operator.
    var fred = Person('Fred');
    
    // Logs 'fred' because name has been defined in the 
    // global scope object.
    console.log(name);
    
    // Logs 'fred' because this refers to the global scope object.
    console.log(this.name);
})();

(function() {
    'use strict';
    
    function Person(name) {
        this.name = name;
    }
    
    // Fails because of missing 'new' operator.
    // Error reported: cannot set prop 'name' of undefined 
    // (this is undefined in Person constructor)
    var fred = Person.bind({})('Fred');
})();
