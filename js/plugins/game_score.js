class GameScore {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.multiplier = 1;
    }

    addScore(points) {
        if (points < 0) return;
        this.score += points * this.multiplier;
        this.updateHighScore();
    }

    subtractScore(points) {
        if (points < 0) return;
        this.score = Math.max(0, this.score - points);
    }

    setMultiplier(multiplier) {
        if (multiplier < 1) return;
        this.multiplier = multiplier;
    }

    resetMultiplier() {
        this.multiplier = 1;
    }

    resetScore() {
        this.score = 0;
        this.resetMultiplier();
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    getScore() {
        return this.score;
    }

    getHighScore() {
        return this.highScore;
    }
}

// Export for module usage, or attach to window for global usage
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = GameScore;
} else if (typeof window !== 'undefined') {
    window.GameScore = GameScore;
}
