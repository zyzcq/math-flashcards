/**
 * fx_sparkle.js - Sparkle Effect Function
 */

function createSparkle(x, y, options = {}) {
    const color = options.color || '#FFD700';
    const size = options.size || 10;
    const duration = options.duration || 1000;
    
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.backgroundColor = color;
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    // Add animation
    sparkle.animate([
        { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(1) rotate(180deg)', opacity: 0.8 },
        { transform: 'translate(-50%, -50%) scale(0) rotate(360deg)', opacity: 0 }
    ], {
        duration: duration,
        easing: 'ease-out',
        fill: 'forwards'
    });
    
    document.body.appendChild(sparkle);
    
    // Clean up
    setTimeout(() => {
        sparkle.remove();
    }, duration);
}

// Export or attach to window
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSparkle };
} else {
    window.createSparkle = createSparkle;
}
