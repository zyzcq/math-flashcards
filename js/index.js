const themeStyles = {
    sky: { bg: 'bg-sky-500', text: 'text-sky-600', lightBg: 'bg-sky-50', border: 'border-sky-100', icon: 'fa-square-root-variable' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', lightBg: 'bg-indigo-50', border: 'border-indigo-100', icon: 'fa-language' },
    violet: { bg: 'bg-violet-500', text: 'text-violet-600', lightBg: 'bg-violet-50', border: 'border-violet-100', icon: 'fa-chart-line' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', lightBg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'fa-code' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-600', lightBg: 'bg-rose-50', border: 'border-rose-100', icon: 'fa-rocket' },
    default: { bg: 'bg-slate-500', text: 'text-slate-600', lightBg: 'bg-slate-50', border: 'border-slate-100', icon: 'fa-book' }
};

const STUDY_PROGRESS_KEY = 'math_flashcard_progress';
const mainContainer = document.getElementById('main-container');

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, '&#96;');
}

function readProgressStore() {
    try {
        return JSON.parse(localStorage.getItem(STUDY_PROGRESS_KEY)) || {};
    } catch (error) {
        localStorage.removeItem(STUDY_PROGRESS_KEY);
        return {};
    }
}

function getTheme(themeColor) {
    return themeStyles[themeColor] || themeStyles.default;
}

function getCardsCount(item) {
    return Array.isArray(item.cards) ? item.cards.length : 0;
}

function getTargetUrl(item) {
    if (item.type !== 'article') {
        return `study.html?type=${encodeURIComponent(item.id)}`;
    }

    const rawUrl = String(item.url || '').trim();
    const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(rawUrl);

    if (!rawUrl || (hasProtocol && !/^https?:/i.test(rawUrl))) {
        return '#';
    }

    return rawUrl;
}

function getProgress(item, progressStore) {
    const total = getCardsCount(item);
    const saved = progressStore[item.id];

    if (!total || !saved || saved.total !== total) {
        return { current: 0, seen: 0, total, percent: 0 };
    }

    const activeIndex = Math.min(Math.max(Number(saved.index) + 1 || 0, 0), total);
    const seen = Math.min(Array.isArray(saved.seen) ? saved.seen.length : 0, total);
    const current = Math.max(activeIndex, seen);

    return {
        current,
        seen,
        total,
        percent: Math.round((current / total) * 100)
    };
}

function renderProgressBar(progress, theme) {
    if (!progress.total || progress.current === 0) return '';

    return `
        <div class="mt-4" aria-label="学习进度 ${progress.current} / ${progress.total}">
            <div class="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>已学 ${progress.current}/${progress.total}</span>
                <span>${progress.percent}%</span>
            </div>
            <div class="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div class="h-full ${theme.bg}" style="width: ${progress.percent}%"></div>
            </div>
        </div>
    `;
}

function renderBadge(item, theme, progress) {
    if (item.type === 'article') {
        return `<span class="module-badge ${theme.lightBg} ${theme.text}">独立讲义</span>`;
    }

    const total = getCardsCount(item);
    const progressLabel = progress.current > 0
        ? ` · ${progress.seen ? `已看 ${progress.seen} 张` : `已到第 ${progress.current} 张`}`
        : '';

    return `<span class="module-badge ${theme.lightBg} ${theme.text}">共 ${total} 张卡片${progressLabel}</span>`;
}

function renderModuleCard(item, progressStore) {
    const theme = getTheme(item.themeColor);
    const targetUrl = getTargetUrl(item);
    const progress = getProgress(item, progressStore);
    const title = escapeHtml(item.title);
    const subtitle = escapeHtml(item.subtitle);
    const ariaLabel = item.type === 'article'
        ? `${item.title}，打开独立讲义`
        : `${item.title}，${progress.total} 张卡片`;

    return `
        <a href="${escapeAttribute(targetUrl)}"
           class="module-card snap-start shrink-0 w-72 bg-white rounded-2xl p-6 border ${theme.border} cursor-pointer shadow-sm relative overflow-hidden group"
           aria-label="${escapeAttribute(ariaLabel)}">
            <div class="absolute -right-4 -top-4 opacity-5 transform group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                <i class="fa-solid ${theme.icon} text-9xl ${theme.text}"></i>
            </div>
            <div class="relative z-10 flex flex-col h-full">
                <div class="w-12 h-12 rounded-xl ${theme.lightBg} ${theme.text} flex items-center justify-center text-xl mb-4 shadow-sm" aria-hidden="true">
                    <i class="fa-solid ${theme.icon}"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-1">${title}</h3>
                <p class="text-xs font-bold text-slate-400 mb-2">${subtitle}</p>
                ${renderProgressBar(progress, theme)}
                <div class="mt-auto pt-6 flex items-center justify-between gap-3">
                    ${renderBadge(item, theme, progress)}
                    <div class="w-8 h-8 rounded-full ${theme.bg} text-white flex items-center justify-center shadow-md transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        <i class="fa-solid fa-arrow-right text-sm"></i>
                    </div>
                </div>
            </div>
        </a>
    `;
}

function renderCategory(category, progressStore) {
    const items = Array.isArray(category.items) ? category.items : [];
    const cardsHtml = items.map(item => renderModuleCard(item, progressStore)).join('');

    return `
        <section class="mb-12" aria-labelledby="category-${escapeAttribute(category.categoryTitle)}">
            <h2 id="category-${escapeAttribute(category.categoryTitle)}" class="text-2xl font-bold text-slate-800 mb-6 border-l-4 ${category.categoryBorder} pl-3">
                ${escapeHtml(category.categoryTitle)}
            </h2>
            <div class="category-row flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
                ${cardsHtml}
            </div>
        </section>
    `;
}

function renderEmptyState() {
    mainContainer.innerHTML = `
        <div class="empty-state">
            <i class="fa-solid fa-layer-group text-3xl text-slate-300 mb-3" aria-hidden="true"></i>
            <p class="text-sm font-bold text-slate-500">还没有可展示的学习模块</p>
        </div>
    `;
}

function renderHome() {
    const categories = typeof siteData === 'undefined' ? [] : siteData;

    if (!Array.isArray(categories) || categories.length === 0) {
        renderEmptyState();
        return;
    }

    const progressStore = readProgressStore();
    const html = categories.map(category => renderCategory(category, progressStore)).join('');

    requestAnimationFrame(() => {
        mainContainer.innerHTML = html;
    });
}

renderHome();
