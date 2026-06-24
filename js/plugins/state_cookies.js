// js/plugins/state_cookies.js

/**
 * Utility functions for handling cookies.
 */
const StateCookies = {
    /**
     * Set a cookie
     * @param {string} name 
     * @param {string} value 
     * @param {number} days 
     */
    set: function(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value || "") + expires + "; path=/";
    },

    /**
     * Get a cookie
     * @param {string} name 
     * @returns {string|null}
     */
    get: function(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },

    /**
     * Erase a cookie
     * @param {string} name 
     */
    erase: function(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

// Export or attach to window depending on your module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StateCookies;
} else if (typeof window !== 'undefined') {
    window.StateCookies = StateCookies;
} else {
    export default StateCookies;
}
