
var box = {
    locked: true,
    unlock: function() { this.locked = false; },
    lock: function() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) {
            throw new Error('Locked!');
        }
        
        return this._content;
    }, 
    toString: function() {
        return '{contents: ' + this._content + ', locked: ' + this.locked + '}';
    }
};

function withBoxUnlock(func) {
    box.unlock();
    
    try {
        func();
    } catch (error) {
        // Re-throw error.
        throw error;    
    } finally {
        // Always lock the box.
        box.lock();
    }
}

withBoxUnlock(function() {
    box.content.push('gold piece');
});

console.log('Current box state: ' + box);

try {
    withBoxUnlock(function() {
        throw new Error('Pirates on the horizon! Abort!');
    });
} catch (error) {
    console.log('Error raised: ' + error);
}

console.log('Current box state: ' + box);

