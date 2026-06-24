/**
 * Array Helper Functions
 */

const ArrayUtil = {
    /**
     * Shuffles an array in place.
     * @param {Array} array
     * @returns {Array} The shuffled array
     */
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    /**
     * Splits an array into chunks of given size.
     * @param {Array} array 
     * @param {number} size 
     * @returns {Array[]} 
     */
    chunk(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    },

    /**
     * Returns an array with unique elements.
     * @param {Array} array 
     * @returns {Array}
     */
    unique(array) {
        return [...new Set(array)];
    },

    /**
     * Groups an array of objects by a specific key.
     * @param {Array} array 
     * @param {string|function} key 
     * @returns {Object}
     */
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const groupKey = typeof key === 'function' ? key(item) : item[key];
            if (!result[groupKey]) {
                result[groupKey] = [];
            }
            result[groupKey].push(item);
            return result;
        }, {});
    }
};

export default ArrayUtil;
