
function evalAndReturnX(code) {
    eval(code);
    
    return x;
}

console.log(evalAndReturnX('var x = 2'));