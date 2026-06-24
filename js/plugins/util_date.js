/**
 * Date utility functions
 */

const DateUtils = {
    /**
     * Format a date into a specific pattern
     * @param {Date|number|string} date - The date to format
     * @param {string} format - The format string (e.g., 'YYYY-MM-DD HH:mm:ss')
     * @returns {string} Formatted date string
     */
    formatDate: function(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        const map = {
            'M+': d.getMonth() + 1, // month
            'D+': d.getDate(), // day
            'H+': d.getHours(), // hour
            'm+': d.getMinutes(), // minute
            's+': d.getSeconds(), // second
            'q+': Math.floor((d.getMonth() + 3) / 3), // quarter
            'S': d.getMilliseconds() // millisecond
        };

        let result = format;
        if (/(Y+)/.test(result)) {
            result = result.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (let k in map) {
            if (new RegExp('(' + k + ')').test(result)) {
                result = result.replace(RegExp.$1, RegExp.$1.length === 1 ? map[k] : ('00' + map[k]).substr(('' + map[k]).length));
            }
        }
        return result;
    },

    /**
     * Add days to a date
     * @param {Date} date
     * @param {number} days
     * @returns {Date}
     */
    addDays: function(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    /**
     * Check if a year is a leap year
     * @param {number} year 
     * @returns {boolean}
     */
    isLeapYear: function(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
};

export default DateUtils;
