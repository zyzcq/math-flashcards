(function () {
    const releaseAt = 1782735720765;
    const script = document.currentScript;
    const mode = script?.dataset?.mcuLock || 'always';
    const mcuStudyTypes = new Set(['mcu_points', 'mcu_short_answers']);
    const params = new URLSearchParams(window.location.search);
    const shouldLock = mode === 'always' || mcuStudyTypes.has(params.get('type'));

    if (!shouldLock || Date.now() >= releaseAt) return;

    const imageUrl = new URL('../assets/mcu-lock-meme.png', script?.src || window.location.href).href;
    const style = document.createElement('style');
    style.textContent = `
        html.mcu-lock-active body {
            margin: 0 !important;
            min-height: 100vh !important;
            overflow: hidden !important;
            background: #fff !important;
        }
        html.mcu-lock-active body > :not(#mcu-lock-screen) {
            display: none !important;
        }
        #mcu-lock-screen {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: grid;
            place-items: center;
            background: #fff;
        }
        #mcu-lock-screen img {
            width: min(82vw, 420px);
            height: auto;
            image-rendering: auto;
        }
    `;
    document.head.appendChild(style);
    document.documentElement.classList.add('mcu-lock-active');

    function showLock() {
        if (document.getElementById('mcu-lock-screen')) return;

        const screen = document.createElement('div');
        screen.id = 'mcu-lock-screen';
        screen.setAttribute('aria-label', '嵌入式页面临时锁定');
        screen.innerHTML = `<img src="${imageUrl}" alt="嗯，那又怎么办？杀了我吗">`;
        document.body.appendChild(screen);
    }

    function unlock() {
        document.documentElement.classList.remove('mcu-lock-active');
        document.getElementById('mcu-lock-screen')?.remove();
    }

    if (document.body) {
        showLock();
    } else {
        document.addEventListener('DOMContentLoaded', showLock, { once: true });
    }

    window.setTimeout(unlock, Math.max(0, releaseAt - Date.now()));
})();
