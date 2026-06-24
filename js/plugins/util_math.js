/**
 * Math utility functions
 */

const MathUtils = {
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     */
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Returns a random float between min and max
     */
    randomFloat: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    /**
     * Clamps a number between min and max
     */
    clamp: function(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    /**
     * Linear interpolation between start and end
     */
    lerp: function(start, end, amt) {
        return (1 - amt) * start + amt * end;
    },

    /**
     * Degrees to radians
     */
    degToRad: function(degrees) {
        return degrees * Math.PI / 180;
    },

    /**
     * Radians to degrees
     */
    radToDeg: function(radians) {
        return radians * 180 / Math.PI;
    }
};

export default MathUtils;
