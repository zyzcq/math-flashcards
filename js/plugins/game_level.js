// js/plugins/game_level.js

/**
 * Utility class for converting between XP (Experience Points) and Levels.
 */
class GameLevel {
    /**
     * @param {number} baseXp - The base XP required for the first level up.
     * @param {number} exponent - The exponent that determines how much the XP requirement increases per level.
     */
    constructor(baseXp = 100, exponent = 1.5) {
        this.baseXp = baseXp;
        this.exponent = exponent;
    }

    /**
     * Converts a given amount of XP to the corresponding Level.
     * @param {number} xp - The current XP.
     * @returns {number} The calculated Level (minimum 1).
     */
    xpToLevel(xp) {
        if (xp <= 0) return 1;
        return Math.floor(Math.pow(xp / this.baseXp, 1 / this.exponent)) + 1;
    }

    /**
     * Calculates the minimum XP required to reach a specific Level.
     * @param {number} level - The target Level.
     * @returns {number} The XP required.
     */
    levelToXp(level) {
        if (level <= 1) return 0;
        return Math.ceil(this.baseXp * Math.pow(level - 1, this.exponent));
    }
}

export default GameLevel;
