// data_math_opt.js
// Math specific optimizations

const MathOpt = {
    // Fast integer division
    div: function(a, b) {
        return (a / b) | 0;
    },
    
    // Fast absolute value
    abs: function(a) {
        return a < 0 ? -a : a;
    },
    
    // Fast floor
    floor: function(a) {
        return a | 0; 
    },

    // Fast ceil
    ceil: function(a) {
        let f = a | 0;
        return f === a ? f : f + 1;
    },

    // Random integer between min and max (inclusive)
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathOpt;
}
