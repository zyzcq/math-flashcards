const STUDY_PROGRESS_KEY = 'math_flashcard_progress';
const ANIMATION_DURATION = 300;

const themeColors = {
    sky: { hex: '#0ea5e9', gradStart: '#0ea5e9', gradEnd: '#3b82f6', text: '#0369a1', border: '#bae6fd', shadow: 'rgba(14, 165, 233, 0.25)' },
    indigo: { hex: '#6366f1', gradStart: '#6366f1', gradEnd: '#8b5cf6', text: '#3730a3', border: '#a5b4fc', shadow: 'rgba(99, 102, 241, 0.25)' },
    violet: { hex: '#8b5cf6', gradStart: '#8b5cf6', gradEnd: '#a855f7', text: '#5b21b6', border: '#c4b5fd', shadow: 'rgba(139, 92, 246, 0.25)' },
    rose: { hex: '#f43f5e', gradStart: '#f43f5e', gradEnd: '#fb7185', text: '#be123c', border: '#fecdd3', shadow: 'rgba(244, 63, 94, 0.25)' },
    emerald: { hex: '#10b981', gradStart: '#10b981', gradEnd: '#34d399', text: '#047857', border: '#a7f3d0', shadow: 'rgba(16, 185, 129, 0.25)' },
    amber: { hex: '#d97706', gradStart: '#d97706', gradEnd: '#f59e0b', text: '#92400e', border: '#fde68a', shadow: 'rgba(217, 119, 6, 0.24)' },
    default: { hex: '#64748b', gradStart: '#64748b', gradEnd: '#475569', text: '#334155', border: '#cbd5e1', shadow: 'rgba(100, 116, 139, 0.22)' }
};

let currentModule = null;
let cardsData = [];
let currentIndex = 0;
let isFlipped = false;
let activeTheme = themeColors.sky;
let isAnimating = false;
let seenCards = new Set();
let toastTimer = null;

const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

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

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getProgressStore() {
    try {
        return JSON.parse(localStorage.getItem(STUDY_PROGRESS_KEY)) || {};
    } catch (error) {
        localStorage.removeItem(STUDY_PROGRESS_KEY);
        return {};
    }
}

function setProgressStore(store) {
    localStorage.setItem(STUDY_PROGRESS_KEY, JSON.stringify(store));
}

function getCardKey(card, index) {
    return `${index}:${card?.title || ''}:${card?.q || ''}`;
}

function getSavedProgress(moduleId, total) {
    const saved = getProgressStore()[moduleId];
    if (!saved || saved.total !== total) {
        return { index: 0, seen: [] };
    }

    return {
        index: clamp(Number(saved.index) || 0, 0, Math.max(total - 1, 0)),
        seen: Array.isArray(saved.seen) ? saved.seen : []
    };
}

function saveProgress() {
    if (!currentModule || cardsData.length === 0) return;

    const store = getProgressStore();
    store[currentModule.id] = {
        index: currentIndex,
        total: cardsData.length,
        seen: Array.from(seenCards),
        updatedAt: Date.now()
    };
    setProgressStore(store);
}

function markCurrentCardSeen() {
    if (!cardsData[currentIndex]) return;
    seenCards.add(getCardKey(cardsData[currentIndex], currentIndex));
    saveProgress();
}

function showToast(message) {
    if (!dom.toast) return;

    clearTimeout(toastTimer);
    dom.toast.textContent = message;
    dom.toast.classList.add('show');
    toastTimer = setTimeout(() => dom.toast.classList.remove('show'), 2000);
}

function toggleFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;
    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!getFullscreenElement()) {
        if (requestFullScreen) {
            Promise.resolve(requestFullScreen.call(docEl)).catch(() => showToast('当前浏览器不支持进入全屏'));
        } else {
            showToast('当前浏览器不支持进入全屏');
        }
    } else if (cancelFullScreen) {
        Promise.resolve(cancelFullScreen.call(doc)).catch(() => showToast('退出全屏失败'));
    }
}

function getFullscreenElement() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}

function syncFullscreenIcon() {
    if (!dom.fullscreenIcon) return;

    const isFullscreen = Boolean(getFullscreenElement());
    dom.fullscreenIcon.classList.toggle('fa-expand', !isFullscreen);
    dom.fullscreenIcon.classList.toggle('fa-compress', isFullscreen);
}

function initPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const dataSource = typeof appData === 'undefined' ? {} : appData;
    const modules = Object.values(dataSource);

    currentModule = type && dataSource[type] ? dataSource[type] : modules[0];

    if (!currentModule) {
        renderEmptyModule('没有找到可学习的模块');
        return;
    }

    cardsData = Array.isArray(currentModule.cards) ? currentModule.cards.slice() : [];
    activeTheme = themeColors[currentModule.themeColor] || themeColors.default;

    applyTheme(currentModule.themeColor);
    dom.title.textContent = currentModule.title || '学习卡片';
    document.title = `${dom.title.textContent} - 记忆闪卡`;

    const saved = getSavedProgress(currentModule.id, cardsData.length);
    currentIndex = saved.index;
    seenCards = new Set(saved.seen.filter(key => cardsData.some((card, index) => getCardKey(card, index) === key)));

    requestAnimationFrame(() => loadCard(currentIndex));
}

function applyTheme(colorKey) {
    activeTheme = themeColors[colorKey] || themeColors.default;

    dom.frontFace.style.background = `linear-gradient(135deg, ${activeTheme.gradStart}, ${activeTheme.gradEnd})`;
    dom.card.style.boxShadow = `0 20px 40px -5px ${activeTheme.shadow}`;
    dom.progressBar.style.backgroundColor = activeTheme.hex;
    dom.nextBtn.style.backgroundColor = activeTheme.hex;

    dom.tipBox.style.borderColor = activeTheme.border;
    dom.tipTitle.style.color = activeTheme.hex;
    dom.tipTitle.style.borderBottomColor = activeTheme.border;
    dom.tipContent.style.color = activeTheme.text;
}

function renderEmptyModule(message) {
    cardsData = [];
    currentIndex = 0;
    isFlipped = false;

    dom.card.classList.remove('flipped');
    dom.card.classList.add('empty-card');
    dom.card.setAttribute('aria-label', message);
    dom.qWrapper.style.opacity = '1';
    dom.aWrapper.style.opacity = '1';
    dom.title.textContent = currentModule?.title || '学习卡片';
    dom.qText.className = 'text-2xl font-bold leading-normal drop-shadow-md px-2';
    dom.qText.textContent = message;
    dom.qIndex.textContent = '空模块';
    dom.tipContent.textContent = '这个模块当前没有闪卡内容，可以从首页打开独立讲义继续学习。';
    dom.aContent.textContent = '';
    updateUI();
}

function getQuestionSizeClass(content) {
    const plainTextLength = String(content || '').replace(/<[^>]+>/g, '').length;
    if (plainTextLength > 56) return 'text-xl';
    if (plainTextLength > 25) return 'text-2xl';
    return 'text-3xl';
}

function loadCard(index) {
    if (cardsData.length === 0) {
        renderEmptyModule('暂无卡片内容');
        return;
    }

    currentIndex = clamp(index, 0, cardsData.length - 1);
    const data = cardsData[currentIndex];
    isFlipped = false;

    dom.card.classList.remove('flipped', 'empty-card');
    dom.card.setAttribute('aria-label', '题目面，点击翻到答案');
    dom.card.setAttribute('tabindex', '0');

    dom.qWrapper.style.opacity = '0';
    dom.aWrapper.style.opacity = '0';
    dom.qText.className = `${getQuestionSizeClass(data.q)} font-bold leading-normal drop-shadow-md px-2`;

    dom.qText.innerHTML = data.q || '';
    dom.qIndex.textContent = data.title || `第 ${currentIndex + 1} 张`;
    dom.tipContent.innerHTML = data.tip || '暂无解析';
    dom.aContent.innerHTML = data.a || '';

    dom.backScrollArea.scrollTop = 0;
    renderMath();
    markCurrentCardSeen();

    requestAnimationFrame(() => {
        dom.qWrapper.style.opacity = '1';
        dom.aWrapper.style.opacity = '1';
    });

    updateUI();
}

function renderMath() {
    if (!window.renderMathInElement) return;

    try {
        renderMathInElement(dom.card, katexOptions);
    } catch (error) {
        console.warn('Math rendering failed:', error);
    }
}

function flipCard(event) {
    if (cardsData.length === 0) return;
    if (window.getSelection().toString().length > 0) return;

    const target = event?.target;
    if (target?.closest?.('a, button, input, textarea, select, [data-no-flip]')) return;

    isFlipped = !isFlipped;
    dom.card.classList.toggle('flipped', isFlipped);
    dom.card.setAttribute('aria-label', isFlipped ? '答案面，点击回到题目' : '题目面，点击翻到答案');
}

function goToCard(index, direction) {
    if (isAnimating || cardsData.length === 0) return;
    isAnimating = true;

    dom.card.classList.remove('slide-in-right', 'slide-in-left');
    void dom.card.offsetWidth;

    loadCard(index);

    if (!prefersReducedMotion) {
        dom.card.classList.add(direction === 'prev' ? 'slide-in-left' : 'slide-in-right');
    }

    setTimeout(() => {
        dom.card.classList.remove('slide-in-right', 'slide-in-left');
        isAnimating = false;
    }, prefersReducedMotion ? 0 : ANIMATION_DURATION);
}

function nextCard() {
    const nextIndex = currentIndex < cardsData.length - 1 ? currentIndex + 1 : 0;
    goToCard(nextIndex, 'next');
}

function prevCard() {
    if (currentIndex <= 0) return;
    goToCard(currentIndex - 1, 'prev');
}

function shuffleCards() {
    if (cardsData.length <= 1) {
        showToast('当前模块不需要打乱');
        return;
    }

    for (let i = cardsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsData[i], cardsData[j]] = [cardsData[j], cardsData[i]];
    }

    currentIndex = 0;
    seenCards = new Set();
    loadCard(currentIndex);
    showToast('已打乱卡片顺序');
}

function updateUI() {
    const total = cardsData.length;
    const current = total ? currentIndex + 1 : 0;
    const percent = total ? (current / total) * 100 : 0;
    const seenCount = Math.min(seenCards.size, total);

    dom.progressText.textContent = total ? `${current} / ${total} · 已看 ${seenCount}` : '0 / 0';
    dom.progressBar.style.width = `${percent}%`;
    dom.progressBar.setAttribute('aria-valuenow', String(Math.round(percent)));

    dom.prevBtn.disabled = currentIndex === 0 || total === 0;
    dom.nextBtn.disabled = total === 0;

    if (total === 0) {
        dom.nextText.textContent = '暂无卡片';
        dom.nextIcon.className = 'fa-solid fa-ban text-sm';
    } else if (currentIndex === total - 1) {
        dom.nextText.textContent = '重新复习';
        dom.nextIcon.className = 'fa-solid fa-rotate-right text-sm';
    } else {
        dom.nextText.textContent = '下一张';
        dom.nextIcon.className = 'fa-solid fa-chevron-right text-sm';
    }
}

function shouldIgnoreShortcut(target) {
    if (!target) return false;
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
}

document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || shouldIgnoreShortcut(event.target)) return;

    if (event.code === 'Space' || event.key === 'Enter') {
        event.preventDefault();
        flipCard(event);
    } else if (event.code === 'ArrowRight') {
        nextCard();
    } else if (event.code === 'ArrowLeft') {
        prevCard();
    } else if (event.code === 'KeyS') {
        shuffleCards();
    } else if (event.code === 'KeyF') {
        toggleFullScreen();
    }
});

let touchStartX = 0;
let touchStartY = 0;

dom.swipeZone.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    touchStartX = touch.screenX;
    touchStartY = touch.screenY;
}, {passive: true});

dom.swipeZone.addEventListener('touchend', event => {
    const touch = event.changedTouches[0];
    const deltaX = touchStartX - touch.screenX;
    const deltaY = touchStartY - touch.screenY;

    if (Math.abs(deltaX) <= 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    const target = event.target;
    const scrollWrapper = target?.closest?.('.math-scroll-wrapper');
    if (scrollWrapper && scrollWrapper.scrollWidth > scrollWrapper.clientWidth) return;

    if (deltaX > 0) nextCard();
    else prevCard();
}, {passive: true});

document.addEventListener('fullscreenchange', syncFullscreenIcon);
document.addEventListener('webkitfullscreenchange', syncFullscreenIcon);
document.addEventListener('DOMContentLoaded', initPage);
window.addEventListener('pagehide', saveProgress);
