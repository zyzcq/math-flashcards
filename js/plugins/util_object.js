/**
 * Object utility functions
 */

const UtilObject = {
    /**
     * Deep clones an object
     * @param {Object} obj The object to clone
     * @returns {Object} The cloned object
     */
    deepClone: function(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => this.deepClone(item));
        }
        const cloned = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                cloned[key] = this.deepClone(obj[key]);
            }
        }
        return cloned;
    },

    /**
     * Merges two objects deeply
     * @param {Object} target The target object
     * @param {Object} source The source object
     * @returns {Object} The merged object
     */
    deepMerge: function(target, source) {
        if (typeof target !== 'object' || typeof source !== 'object') return source;
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] instanceof Object && target[key] instanceof Object) {
                    target[key] = this.deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    },

    /**
     * Checks if an object is empty
     * @param {Object} obj The object to check
     * @returns {boolean} True if empty, false otherwise
     */
    isEmpty: function(obj) {
        return Object.keys(obj).length === 0;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UtilObject;
} else if (typeof window !== 'undefined') {
    window.UtilObject = UtilObject;
}
