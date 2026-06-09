const SESSION_KEY = 'math_flashcard_session';
const STUDY_PROGRESS_KEY = 'math_flashcard_progress';
const CATEGORY_STATE_KEY = 'home_category_visibility';

const themeStyles = {
    sky: { tone: 'tone-sky', icon: 'fa-square-root-variable' },
    indigo: { tone: 'tone-indigo', icon: 'fa-language' },
    violet: { tone: 'tone-violet', icon: 'fa-chart-line' },
    fuchsia: { tone: 'tone-fuchsia', icon: 'fa-vial-circle-check' },
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

    if (!session) {
        if (userDisplay) userDisplay.textContent = '访客';
        if (logoutBtn) {
            logoutBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket" aria-hidden="true"></i> <span>登录</span>';
            logoutBtn.setAttribute('aria-label', '登录');
        }
        return true;
    }

    if (userDisplay) userDisplay.textContent = session.username;
    if (logoutBtn) {
        logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> <span>退出</span>';
        logoutBtn.setAttribute('aria-label', '退出登录');
    }
    return true;
}

function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.reload();
}

function getTheme(item) {
    return themeStyles[item.themeColor] || themeStyles.default;
}

function getTargetUrl(item) {
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view') || localStorage.getItem('shared_view');
    const suffix = viewParam ? `view=${encodeURIComponent(viewParam)}` : '';

    if (item.type !== 'article') {
        const url = `study.html?type=${encodeURIComponent(item.id)}`;
        return suffix ? `${url}&${suffix}` : url;
    }

    const rawUrl = String(item.url || '').trim();
    const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(rawUrl);

    if (!rawUrl || (hasProtocol && !/^https?:/i.test(rawUrl))) {
        return '#';
    }

    if (!suffix) return rawUrl;

    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}${suffix}`;
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
            <div id="${panelId}" class="category-content">
                <div class="category-content-inner">
                    <div class="study-list">
                        ${items.map(renderModule).join('')}
                    </div>
                </div>
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

    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view') || localStorage.getItem('shared_view');
    
    const session = readJson(SESSION_KEY);
    const isZyz = session && session.username === 'zyz';
    
    let filteredCategories;
    if (isZyz) {
        filteredCategories = viewParam 
            ? categories.filter(cat => cat.categoryId === viewParam)
            : categories;
    } else {
        filteredCategories = categories.filter(cat => cat.categoryId === 'major');
    }

    if (filteredCategories.length === 0) {
        renderEmptyState();
        return;
    }

    const progressStore = readJson(STUDY_PROGRESS_KEY) || {};
    const modules = getFlatModules(filteredCategories, progressStore);
    const resume = getResumeModule(modules);
    const activeCategoryIndex = resume?.categoryIndex ?? 0;
    const categoryState = getCategoryState(filteredCategories, activeCategoryIndex);
    const categoryHtml = filteredCategories.map((category, index) => renderCategory(category, index, modules, categoryState)).join('');

    requestAnimationFrame(() => {
        mainContainer.innerHTML = `
            ${renderResume(resume)}
            ${renderShortcuts(filteredCategories)}
            ${categoryHtml}
        `;
        bindCategoryControls(filteredCategories);
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
    section.classList.toggle('is-collapsed', !expanded);
    button?.setAttribute('aria-expanded', String(expanded));
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

function handleAuthAction() {
    const session = readJson(SESSION_KEY);
    if (session) {
        handleLogout();
    } else {
        window.location.href = 'login.html';
    }
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    if (!themeBtn || !themeIcon) return;

    // 获取当前主题并设置图标
    const savedTheme = localStorage.getItem('theme') || 'light';
    themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-moon theme-icon' : 'fa-solid fa-sun theme-icon';

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // 应用并保存主题
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        
        // 旋转加微缩放动画
        themeIcon.classList.add('rotate-animation');
        setTimeout(() => {
            themeIcon.className = nextTheme === 'dark' ? 'fa-solid fa-moon theme-icon' : 'fa-solid fa-sun theme-icon';
            themeIcon.classList.remove('rotate-animation');
        }, 400);
    });
}

function initHome() {
    requireSession();
    initThemeToggle();
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleAuthAction);
    }
    renderHome();
}

initHome();
