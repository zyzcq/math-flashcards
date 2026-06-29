(function () {
    const script = document.currentScript;
    const examStart = script?.dataset?.examStart || '2026-06-30T19:00:00+08:00';
    const lockMinutes = Number(script?.dataset?.lockMinutes || 50);
    const lockStartAt = Date.parse(examStart);
    const lockEndAt = lockStartAt + lockMinutes * 60 * 1000;
    const mode = script?.dataset?.mcuLock || 'always';
    const mcuStudyTypes = new Set(['mcu_points', 'mcu_short_answers']);
    const params = new URLSearchParams(window.location.search);
    const shouldLock = mode === 'always' || mcuStudyTypes.has(params.get('type'));

    if (!shouldLock || !Number.isFinite(lockStartAt) || !Number.isFinite(lockEndAt) || Date.now() >= lockEndAt) return;

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
            max-width: 100vw;
            max-height: 100vh;
            width: auto;
            height: auto;
            object-fit: contain;
        }
    `;
    document.head.appendChild(style);

    function showLock() {
        if (Date.now() >= lockEndAt || document.getElementById('mcu-lock-screen')) return;

        document.documentElement.classList.add('mcu-lock-active');
        const screen = document.createElement('div');
        screen.id = 'mcu-lock-screen';
        screen.setAttribute('aria-label', 'Embedded systems temporary lock');
        screen.innerHTML = `<img src="${imageUrl}" alt="Embedded systems temporary lock">`;
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
