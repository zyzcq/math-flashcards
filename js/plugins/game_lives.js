// game_lives.js
// Health and Lives Mechanics Logic

class GameLives {
    constructor(maxLives = 3, maxHealth = 100) {
        this.maxLives = maxLives;
        this.lives = maxLives;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.isGameOver = false;
    }

    takeDamage(amount) {
        if (this.isGameOver) return;
        
        this.health -= amount;
        if (this.health <= 0) {
            this.loseLife();
        }
    }

    heal(amount) {
        if (this.isGameOver) return;
        
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    loseLife() {
        this.lives -= 1;
        if (this.lives <= 0) {
            this.lives = 0;
            this.health = 0;
            this.gameOver();
        } else {
            this.health = this.maxHealth; // Reset health after losing a life
        }
    }

    addLife(amount = 1) {
        this.lives += amount;
        if (this.lives > this.maxLives) {
            this.lives = this.maxLives;
        }
    }

    gameOver() {
        this.isGameOver = true;
        console.log("Game Over!");
    }

    reset() {
        this.lives = this.maxLives;
        this.health = this.maxHealth;
        this.isGameOver = false;
    }

    getStatus() {
        return {
            lives: this.lives,
            health: this.health,
            maxLives: this.maxLives,
            maxHealth: this.maxHealth,
            isGameOver: this.isGameOver
        };
    }
}

export default GameLives;
