/**
 * String manipulation utilities
 */

const StringUtil = {
    /**
     * Capitalizes the first letter of a string
     * @param {string} str 
     * @returns {string}
     */
    capitalize: (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Converts a string to camel case
     * @param {string} str 
     * @returns {string}
     */
    camelCase: (str) => {
        if (!str) return '';
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    },

    /**
     * Truncates a string to a specified length
     * @param {string} str 
     * @param {number} length 
     * @returns {string}
     */
    truncate: (str, length = 50) => {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.slice(0, length) + '...';
    },

    /**
     * Checks if a string is null, undefined or empty
     * @param {string} str 
     * @returns {boolean}
     */
    isEmpty: (str) => {
        return !str || str.trim().length === 0;
    }
};

export default StringUtil;
