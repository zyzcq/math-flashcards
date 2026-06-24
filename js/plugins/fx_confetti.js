// Simple confetti function
function throwConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Randomize color, size, and starting position
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5; // 5 to 15 px
        const left = Math.random() * 100; // 0 to 100 vw
        
        confetti.style.position = 'fixed';
        confetti.style.top = '-20px';
        confetti.style.left = left + 'vw';
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.backgroundColor = color;
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'; // Circle or square
        confetti.style.pointerEvents = 'none'; // Don't block clicks
        
        document.body.appendChild(confetti);
        
        // Animate
        const fallDuration = Math.random() * 3 + 2; // 2 to 5 seconds
        const rotateX = Math.random() * 720;
        const rotateY = Math.random() * 720;
        const rotateZ = Math.random() * 720;
        const drift = Math.random() * 200 - 100; // horizontal drift
        
        confetti.animate([
            { transform: `translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`, opacity: 1 },
            { transform: `translate3d(${drift}px, 100vh, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`, opacity: 0 }
        ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(.37,0,.63,1)',
            fill: 'forwards'
        });
        
        // Remove element after animation
        setTimeout(() => {
            confetti.remove();
        }, fallDuration * 1000);
    }
}
