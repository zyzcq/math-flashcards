/**
 * Local Storage Plugin
 * Handles saving and loading state from browser's localStorage
 */

const StateLocal = {
    /**
     * Saves data to local storage under the specified key.
     * @param {string} key 
     * @param {any} data 
     * @returns {boolean} True if successful, false otherwise.
     */
    save: function(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
            return true;
        } catch (error) {
            console.error("Error saving to local storage", error);
            return false;
        }
    },

    /**
     * Loads data from local storage for the specified key.
     * @param {string} key 
     * @returns {any} The parsed data, or null if not found or on error.
     */
    load: function(key) {
        try {
            const serializedData = localStorage.getItem(key);
            if (serializedData === null) {
                return null;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error("Error loading from local storage", error);
            return null;
        }
    },

    /**
     * Removes the data associated with the specified key from local storage.
     * @param {string} key 
     * @returns {boolean} True if successful, false otherwise.
     */
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error("Error removing from local storage", error);
            return false;
        }
    },

    /**
     * Clears all data from local storage.
     * @returns {boolean} True if successful, false otherwise.
     */
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error("Error clearing local storage", error);
            return false;
        }
    }
};

export default StateLocal;
