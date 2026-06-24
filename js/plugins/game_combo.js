/*:
 * @target MZ
 * @plugindesc Adds a combo multiplier system.
 * @author Antigravity
 *
 * @help game_combo.js
 *
 * Simple combo multiplier logic.
 */

(() => {
    const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
        if (value > 0) {
            $gameParty.increaseCombo();
            value = Math.floor(value * $gameParty.getComboMultiplier());
        } else {
            $gameParty.resetCombo();
        }
        _Game_Action_executeDamage.call(this, target, value);
    };

    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.call(this);
        this._comboCount = 0;
    };

    Game_Party.prototype.increaseCombo = function() {
        this._comboCount = (this._comboCount || 0) + 1;
    };

    Game_Party.prototype.resetCombo = function() {
        this._comboCount = 0;
    };

    Game_Party.prototype.getComboMultiplier = function() {
        return 1.0 + ((this._comboCount || 0) * 0.1);
    };
})();
