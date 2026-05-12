const SESSION_KEY = 'math_flashcard_session';
const STUDY_PROGRESS_KEY = 'math_flashcard_progress';
const CATEGORY_STATE_KEY = 'home_category_visibility';

const themeStyles = {
    sky: { tone: 'tone-sky', icon: 'fa-square-root-variable' },
    indigo: { tone: 'tone-indigo', icon: 'fa-language' },
    violet: { tone: 'tone-violet', icon: 'fa-chart-line' },
    emerald: { tone: 'tone-emerald', icon: 'fa-code' },
    amber: { tone: 'tone-amber', icon: 'fa-diagram-project' },
    rose: { tone: 'tone-rose', icon: 'fa-rocket' },
    default: { tone: 'tone-slate', icon: 'fa-book' }
};

const mainContainer = document.getElementById('main-container');
const userDisplay = document.getElementById('user-display');
const logoutBtn = document.getElementById('logout-btn');

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

function readJson(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        localStorage.removeItem(key);
        return null;
    }
}

function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getDataSource() {
    return {
        appData: typeof appData === 'undefined' ? {} : appData,
        siteData: typeof siteData === 'undefined' ? [] : siteData
    };
}

function requireSession() {
    const session = readJson(SESSION_KEY);

    if (!session?.username) {
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
        return false;
    }

    userDisplay.textContent = session.username;
    return true;
}

function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
}

function getTheme(item) {
    return themeStyles[item.themeColor] || themeStyles.default;
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

function getCardsCount(item) {
    return Array.isArray(item.cards) ? item.cards.length : 0;
}

function getProgress(item, progressStore) {
    const total = getCardsCount(item);
    const saved = progressStore?.[item.id];

    if (!total || !saved || Number(saved.total) !== total) {
        return { total, seen: 0, current: 0, percent: 0, updatedAt: 0 };
    }

    const seen = Math.min(Array.isArray(saved.seen) ? saved.seen.length : 0, total);
    const current = Math.min(Math.max(Number(saved.index) + 1 || 0, seen), total);

    return {
        total,
        seen,
        current,
        percent: Math.round((Math.max(seen, current) / total) * 100),
        updatedAt: Number(saved.updatedAt) || 0
    };
}

function getFlatModules(categories, progressStore) {
    return categories.flatMap((category, categoryIndex) => {
        const items = Array.isArray(category.items) ? category.items : [];
        return items.filter(Boolean).map(item => ({
            item,
            category,
            categoryIndex,
            progress: getProgress(item, progressStore)
        }));
    });
}

function getResumeModule(modules) {
    const flashcards = modules.filter(module => module.item.type !== 'article' && getCardsCount(module.item) > 0);
    return flashcards
        .filter(module => module.progress.updatedAt > 0)
        .sort((a, b) => b.progress.updatedAt - a.progress.updatedAt)[0] || flashcards[0] || null;
}

function renderResume(resume) {
    if (!resume) {
        return '';
    }

    const item = resume.item;
    const action = resume.progress.updatedAt ? '继续复习' : '开始复习';
    const detail = resume.progress.total
        ? `已看 ${resume.progress.seen}/${resume.progress.total} 张`
        : '讲义阅读';

    return `
        <section class="resume-card" aria-label="${action}">
            <div>
                <span class="section-label">${action}</span>
                <h2>${escapeHtml(item.title)}</h2>
                <p>${escapeHtml(item.subtitle || resume.category.categoryTitle)} · ${detail}</p>
            </div>
            <a class="primary-action" href="${escapeAttribute(getTargetUrl(item))}">
                <span>${action}</span>
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
        </section>
    `;
}

function renderProgress(item, progress) {
    if (item.type === 'article') {
        return '<span class="item-meta">讲义</span>';
    }

    const label = progress.total ? `已看 ${progress.seen}/${progress.total}` : '闪卡';
    return `
        <span class="item-meta">${label}</span>
        <span class="mini-progress" aria-label="学习进度 ${progress.percent}%">
            <span style="width: ${progress.percent}%"></span>
        </span>
    `;
}

function renderModule(module) {
    const { item, progress } = module;
    const theme = getTheme(item);
    const title = escapeHtml(item.title);
    const subtitle = escapeHtml(item.subtitle || '');
    const ariaLabel = item.type === 'article'
        ? `${item.title}，打开讲义`
        : `${item.title}，${progress.total} 张闪卡`;

    return `
        <a class="study-item ${theme.tone}" href="${escapeAttribute(getTargetUrl(item))}" aria-label="${escapeAttribute(ariaLabel)}">
            <span class="item-icon" aria-hidden="true">
                <i class="fa-solid ${theme.icon}"></i>
            </span>
            <span class="item-copy">
                <strong>${title}</strong>
                <small>${subtitle}</small>
            </span>
            <span class="item-status">
                ${renderProgress(item, progress)}
            </span>
        </a>
    `;
}

function getCategoryKey(category, categoryIndex) {
    return category.categoryId || `category-${categoryIndex}`;
}

function getCategoryState(categories, activeCategoryIndex) {
    const saved = readJson(CATEGORY_STATE_KEY) || {};

    return categories.reduce((state, category, index) => {
        const key = getCategoryKey(category, index);
        state[key] = typeof saved[key] === 'boolean' ? saved[key] : index === activeCategoryIndex;
        return state;
    }, {});
}

function renderCategory(category, categoryIndex, modules, categoryState) {
    const items = modules.filter(module => module.categoryIndex === categoryIndex);
    const title = escapeHtml(category.categoryTitle);
    const key = getCategoryKey(category, categoryIndex);
    const expanded = categoryState[key];
    const panelId = `category-panel-${categoryIndex}`;

    return `
        <section id="category-${categoryIndex}" class="category-block ${expanded ? '' : 'is-collapsed'}" data-category-key="${escapeAttribute(key)}">
            <button class="category-heading" type="button" data-category-toggle aria-expanded="${expanded}" aria-controls="${panelId}">
                <span class="category-title">
                    <strong>${title}</strong>
                    <small>${items.length} 个主题</small>
                </span>
                <i class="fa-solid fa-chevron-down category-chevron" aria-hidden="true"></i>
            </button>
            <div id="${panelId}" class="study-list" ${expanded ? '' : 'hidden'}>
                ${items.map(renderModule).join('')}
            </div>
        </section>
    `;
}

function renderShortcuts(categories) {
    return `
        <div class="home-controls">
            <nav class="category-tabs" aria-label="学科分类">
                ${categories.map((category, index) => `
                    <a href="#category-${index}">${escapeHtml(category.categoryTitle)}</a>
                `).join('')}
            </nav>
            <button type="button" class="category-action" data-category-action="expand">全部展开</button>
        </div>
    `;
}

function renderEmptyState() {
    mainContainer.innerHTML = `
        <div class="empty-state">
            <p>还没有可展示的学习模块。</p>
        </div>
    `;
}

function renderHome() {
    const { siteData: categories } = getDataSource();

    if (!Array.isArray(categories) || categories.length === 0) {
        renderEmptyState();
        return;
    }

    const progressStore = readJson(STUDY_PROGRESS_KEY) || {};
    const modules = getFlatModules(categories, progressStore);
    const resume = getResumeModule(modules);
    const activeCategoryIndex = resume?.categoryIndex ?? 0;
    const categoryState = getCategoryState(categories, activeCategoryIndex);
    const categoryHtml = categories.map((category, index) => renderCategory(category, index, modules, categoryState)).join('');

    requestAnimationFrame(() => {
        mainContainer.innerHTML = `
            ${renderResume(resume)}
            ${renderShortcuts(categories)}
            ${categoryHtml}
        `;
        bindCategoryControls(categories);
    });
}

function syncCategoryActionButton() {
    const actionButton = mainContainer.querySelector('[data-category-action]');
    if (!actionButton) return;

    const panels = Array.from(mainContainer.querySelectorAll('.category-block'));
    const allExpanded = panels.length > 0 && panels.every(panel => !panel.classList.contains('is-collapsed'));

    actionButton.dataset.categoryAction = allExpanded ? 'collapse' : 'expand';
    actionButton.textContent = allExpanded ? '全部收起' : '全部展开';
}

function setCategoryExpanded(section, expanded) {
    const button = section.querySelector('[data-category-toggle]');
    const panel = section.querySelector('.study-list');

    section.classList.toggle('is-collapsed', !expanded);
    button?.setAttribute('aria-expanded', String(expanded));
    if (panel) panel.hidden = !expanded;
}

function persistCategoryState() {
    const state = {};

    mainContainer.querySelectorAll('.category-block').forEach(section => {
        const key = section.dataset.categoryKey;
        if (key) state[key] = !section.classList.contains('is-collapsed');
    });

    writeJson(CATEGORY_STATE_KEY, state);
}

function bindCategoryControls() {
    mainContainer.querySelectorAll('[data-category-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.category-block');
            if (!section) return;

            const expanded = section.classList.contains('is-collapsed');
            setCategoryExpanded(section, expanded);
            persistCategoryState();
            syncCategoryActionButton();
        });
    });

    const actionButton = mainContainer.querySelector('[data-category-action]');
    actionButton?.addEventListener('click', () => {
        const shouldExpand = actionButton.dataset.categoryAction === 'expand';

        mainContainer.querySelectorAll('.category-block').forEach(section => {
            setCategoryExpanded(section, shouldExpand);
        });
        persistCategoryState();
        syncCategoryActionButton();
    });

    mainContainer.querySelectorAll('.category-tabs a[href^="#category-"]').forEach(link => {
        link.addEventListener('click', () => {
            const section = mainContainer.querySelector(link.getAttribute('href'));
            if (!section) return;

            setCategoryExpanded(section, true);
            persistCategoryState();
            syncCategoryActionButton();
        });
    });

    syncCategoryActionButton();
}

function initHome() {
    if (!requireSession()) return;

    logoutBtn.addEventListener('click', handleLogout);
    renderHome();
}

initHome();
