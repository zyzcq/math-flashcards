(function () {
    const lockStartAt = 1782736380000;
    const lockEndAt = 1782736500000;
    const script = document.currentScript;
    const mode = script?.dataset?.mcuLock || 'always';
    const mcuStudyTypes = new Set(['mcu_points', 'mcu_short_answers']);
    const params = new URLSearchParams(window.location.search);
    const shouldLock = mode === 'always' || mcuStudyTypes.has(params.get('type'));

    if (!shouldLock || Date.now() >= lockEndAt) return;

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
            width: 100vw;
            height: 100vh;
            object-fit: cover;
        }
    `;
    document.head.appendChild(style);

    function showLock() {
        if (Date.now() >= lockEndAt || document.getElementById('mcu-lock-screen')) return;

        document.documentElement.classList.add('mcu-lock-active');
        const screen = document.createElement('div');
        screen.id = 'mcu-lock-screen';
        screen.setAttribute('aria-label', '嵌入式页面临时锁定');
        screen.innerHTML = `<img src="${imageUrl}" alt="嵌入式页面临时锁定">`;
        document.body.appendChild(screen);
    }

    function unlock() {
        document.documentElement.classList.remove('mcu-lock-active');
        document.getElementById('mcu-lock-screen')?.remove();
    }

    function scheduleShow() {
        if (Date.now() >= lockStartAt) {
            showLock();
        } else {
            window.setTimeout(showLock, Math.max(0, lockStartAt - Date.now()));
        }
        window.setTimeout(unlock, Math.max(0, lockEndAt - Date.now()));
    }

    if (document.body) {
        scheduleShow();
    } else {
        document.addEventListener('DOMContentLoaded', scheduleShow, { once: true });
    }
})();
