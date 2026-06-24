class GameTimer {
    constructor(durationSeconds, onTick, onComplete) {
        this.duration = durationSeconds;
        this.remaining = durationSeconds;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.intervalId = null;
    }

    start() {
        if (this.intervalId !== null) return;
        if (this.remaining <= 0) {
            if (this.onComplete) this.onComplete();
            return;
        }
        
        this.intervalId = setInterval(() => {
            this.remaining--;
            if (this.onTick) this.onTick(this.remaining);
            
            if (this.remaining <= 0) {
                this.stop();
                if (this.onComplete) this.onComplete();
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset(newDuration = null) {
        this.stop();
        if (newDuration !== null) {
            this.duration = newDuration;
        }
        this.remaining = this.duration;
    }
    
    getRemainingTime() {
        return this.remaining;
    }
}

// Export for ES modules or attach to window for classic scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameTimer;
} else if (typeof window !== 'undefined') {
    window.GameTimer = GameTimer;
} else {
    export default GameTimer;
}
