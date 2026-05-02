function toggleFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
    const icon = dom.fullscreenIcon;

    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        if (requestFullScreen) requestFullScreen.call(docEl).catch(() => {});
        icon.classList.replace('fa-expand', 'fa-compress');
    } else {
        if (cancelFullScreen) cancelFullScreen.call(doc);
        icon.classList.replace('fa-compress', 'fa-expand');
    }
}

const themeColors = {
    sky: { hex: '#0ea5e9', gradStart: '#0ea5e9', gradEnd: '#3b82f6', text: '#0369a1', border: '#bae6fd', shadow: 'rgba(14, 165, 233, 0.25)' },
    indigo: { hex: '#6366f1', gradStart: '#6366f1', gradEnd: '#8b5cf6', text: '#3730a3', border: '#a5b4fc', shadow: 'rgba(99, 102, 241, 0.25)' },
    violet: { hex: '#8b5cf6', gradStart: '#8b5cf6', gradEnd: '#a855f7', text: '#5b21b6', border: '#c4b5fd', shadow: 'rgba(139, 92, 246, 0.25)' },
    rose: { hex: '#f43f5e', gradStart: '#f43f5e', gradEnd: '#fb7185', text: '#be123c', border: '#fecdd3', shadow: 'rgba(244, 63, 94, 0.25)' },
    emerald: { hex: '#10b981', gradStart: '#10b981', gradEnd: '#34d399', text: '#047857', border: '#a7f3d0', shadow: 'rgba(16, 185, 129, 0.25)' }
};

let currentModule = null;
let cardsData = [];
let currentIndex = 0;
let isFlipped = false;
let activeTheme = themeColors.sky;
let isAnimating = false;

const dom = {
    title: document.getElementById('page-title'),
    frontFace: document.getElementById('front-face'),
    card: document.getElementById('card'),
    qWrapper: document.getElementById('q-wrapper'),
    aWrapper: document.getElementById('a-wrapper'),
    qText: document.getElementById('q-text'),
    qIndex: document.getElementById('q-index'),
    tipBox: document.getElementById('tip-box'),
    tipTitle: document.getElementById('tip-title'),
    tipContent: document.getElementById('mnemonic-content'),
    aContent: document.getElementById('a-content'),
    progressText: document.getElementById('progress-text'),
    progressBar: document.getElementById('progress-bar'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    nextText: document.getElementById('next-text'),
    nextIcon: document.getElementById('next-icon'),
    toast: document.getElementById('toast'),
    backScrollArea: document.querySelector('.back-scroll-area'),
    fullscreenIcon: document.getElementById('fullscreen-icon'),
    swipeZone: document.getElementById('swipe-zone')
};

const katexOptions = {
    delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
    ],
    throwOnError: false
};

function initPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (type && appData[type]) {
        currentModule = appData[type];
    } else {
        currentModule = Object.values(appData)[0];
    }

    cardsData = currentModule.cards.slice();

    applyTheme(currentModule.themeColor);
    dom.title.innerText = currentModule.title;

    requestAnimationFrame(() => loadCard(0));
}

function applyTheme(colorKey) {
    activeTheme = themeColors[colorKey] || themeColors.sky;

    dom.frontFace.style.background = `linear-gradient(135deg, ${activeTheme.gradStart}, ${activeTheme.gradEnd})`;
    dom.card.style.boxShadow = `0 20px 40px -5px ${activeTheme.shadow}`;
    dom.progressBar.style.backgroundColor = activeTheme.hex;
    dom.nextBtn.style.backgroundColor = activeTheme.hex;

    dom.tipBox.style.borderColor = activeTheme.border;
    dom.tipTitle.style.color = activeTheme.hex;
    dom.tipTitle.style.borderBottomColor = activeTheme.border;
    dom.tipContent.style.color = activeTheme.text;
}

function loadCard(index) {
    const data = cardsData[index];
    isFlipped = false;
    isAnimating = false;

    dom.card.classList.remove('flipped');

    dom.qWrapper.style.opacity = '0';
    dom.aWrapper.style.opacity = '0';

    const qFontSizeClass = data.q.length > 25 ? 'text-2xl' : 'text-3xl';
    dom.qText.className = `${qFontSizeClass} font-bold leading-normal drop-shadow-md px-2`;

    dom.qText.innerHTML = data.q;
    dom.qIndex.innerText = data.title;
    dom.tipContent.innerHTML = data.tip;
    dom.aContent.innerHTML = data.a;

    dom.backScrollArea.scrollTop = 0;

    if (window.renderMathInElement) {
        renderMathInElement(dom.card, katexOptions);
    }

    requestAnimationFrame(() => {
        dom.qWrapper.style.opacity = '1';
        dom.aWrapper.style.opacity = '1';
    });

    updateUI();
}

function flipCard(event) {
    if (window.getSelection().toString().length > 0) return;

    isFlipped = !isFlipped;
    dom.card.classList.toggle('flipped', isFlipped);
}

function nextCard() {
    if (isAnimating) return;
    isAnimating = true;

    const nextIndex = currentIndex < cardsData.length - 1 ? currentIndex + 1 : 0;

    dom.card.classList.remove('slide-in-right', 'slide-in-left');
    void dom.card.offsetWidth;

    currentIndex = nextIndex;
    loadCard(currentIndex);
    dom.card.classList.add('slide-in-right');

    requestAnimationFrame(() => {
        setTimeout(() => {
            dom.card.classList.remove('slide-in-right');
            isAnimating = false;
        }, 300);
    });
}

function prevCard() {
    if (isAnimating || currentIndex <= 0) return;
    isAnimating = true;

    dom.card.classList.remove('slide-in-right', 'slide-in-left');
    void dom.card.offsetWidth;

    currentIndex--;
    loadCard(currentIndex);
    dom.card.classList.add('slide-in-left');

    requestAnimationFrame(() => {
        setTimeout(() => {
            dom.card.classList.remove('slide-in-left');
            isAnimating = false;
        }, 300);
    });
}

function shuffleCards() {
    for (let i = cardsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsData[i], cardsData[j]] = [cardsData[j], cardsData[i]];
    }

    currentIndex = 0;
    loadCard(currentIndex);

    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), 2000);
}

function updateUI() {
    const total = cardsData.length;
    dom.progressText.innerText = `${currentIndex + 1} / ${total}`;
    dom.progressBar.style.width = `${((currentIndex + 1) / total) * 100}%`;

    dom.prevBtn.disabled = (currentIndex === 0);

    if (currentIndex === total - 1) {
        dom.nextText.innerText = "重新复习";
        dom.nextIcon.className = "fa-solid fa-rotate-right text-sm";
    } else {
        dom.nextText.innerText = "下一张";
        dom.nextIcon.className = "fa-solid fa-chevron-right text-sm";
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
    else if (e.code === 'ArrowRight') nextCard();
    else if (e.code === 'ArrowLeft') prevCard();
});

let touchStartX = 0;
let touchStartY = 0;

dom.swipeZone.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

dom.swipeZone.addEventListener('touchend', e => {
    const deltaX = touchStartX - e.changedTouches[0].screenX;
    const deltaY = touchStartY - e.changedTouches[0].screenY;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
        const target = e.target;
        if (target && target.closest && target.closest('.math-scroll-wrapper')) {
            const wrapper = target.closest('.math-scroll-wrapper');
            if (wrapper.scrollWidth > wrapper.clientWidth) return;
        }

        if (deltaX > 0) nextCard();
        else prevCard();
    }
}, {passive: true});

document.addEventListener('DOMContentLoaded', initPage);
