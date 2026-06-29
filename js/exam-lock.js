(function () {
    const script = document.currentScript;
    const lockMinutes = Number(script?.dataset?.lockMinutes || 55);
    const mode = script?.dataset?.examLock || 'page';
    const params = new URLSearchParams(window.location.search);
    const courseLocks = {
        se: {
            label: 'Software testing temporary lock',
            examStart: '2026-06-30T08:50:00+08:00',
            studyTypes: ['se_short_answers']
        },
        wx: {
            label: 'Mobile app development temporary lock',
            examStart: '2026-06-30T14:00:00+08:00',
            studyTypes: ['wx_short_answers']
        },
        mcu: {
            label: 'Embedded systems temporary lock',
            examStart: '2026-06-30T19:00:00+08:00',
            studyTypes: ['mcu_points', 'mcu_short_answers']
        }
    };

    function getActiveLock() {
        if (mode === 'study') {
            const type = params.get('type');
            return Object.values(courseLocks).find(lock => lock.studyTypes.includes(type)) || null;
        }

        const courseId = script?.dataset?.examCourse;
        return courseId ? courseLocks[courseId] || null : null;
    }

    const activeLock = getActiveLock();
    const lockStartAt = Date.parse(activeLock?.examStart || '');
    const lockEndAt = lockStartAt + lockMinutes * 60 * 1000;
    const shouldLock = Boolean(activeLock);

    if (!shouldLock || !Number.isFinite(lockStartAt) || !Number.isFinite(lockEndAt) || Date.now() >= lockEndAt) return;

    const imageUrl = new URL('../assets/mcu-lock-meme.png', script?.src || window.location.href).href;
    const style = document.createElement('style');
    style.textContent = `
        html.exam-lock-active body {
            margin: 0 !important;
            min-height: 100vh !important;
            overflow: hidden !important;
            background: #fff !important;
        }
        html.exam-lock-active body > :not(#exam-lock-screen) {
            display: none !important;
        }
        #exam-lock-screen {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: grid;
            place-items: center;
            background: #fff;
        }
        #exam-lock-screen img {
            max-width: 100vw;
            max-height: 100vh;
            width: auto;
            height: auto;
            object-fit: contain;
        }
    `;
    document.head.appendChild(style);

    function showLock() {
        if (Date.now() >= lockEndAt || document.getElementById('exam-lock-screen')) return;

        document.documentElement.classList.add('exam-lock-active');
        const screen = document.createElement('div');
        screen.id = 'exam-lock-screen';
        screen.setAttribute('aria-label', activeLock.label);
        screen.innerHTML = `<img src="${imageUrl}" alt="${activeLock.label}">`;
        document.body.appendChild(screen);
    }

    function unlock() {
        document.documentElement.classList.remove('exam-lock-active');
        document.getElementById('exam-lock-screen')?.remove();
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
