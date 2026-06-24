const SessionState = {
    set: function(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to session storage', e);
        }
    },
    get: function(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from session storage', e);
            return defaultValue;
        }
    },
    remove: function(key) {
        sessionStorage.removeItem(key);
    },
    clear: function() {
        sessionStorage.clear();
    }
};

export default SessionState;
