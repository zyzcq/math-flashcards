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
    if (item && item.type === 'course') {
        return {
            lecture: item.lecture ? getProgress(item.lecture, progressStore) : null,
            quiz: item.quiz ? getProgress(item.quiz, progressStore) : null,
            flashcard: item.flashcard ? getProgress(item.flashcard, progressStore) : null,
            homework: item.homework ? getProgress(item.homework, progressStore) : null
        };
    }

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
    const flatSubModules = [];
    for (const m of modules) {
        if (m.item.type === 'course') {
            if (m.item.quiz) {
                flatSubModules.push({
                    item: m.item.quiz,
                    category: m.category,
                    categoryIndex: m.categoryIndex,
                    progress: m.progress.quiz
                });
            }
            if (m.item.flashcard) {
                flatSubModules.push({
                    item: m.item.flashcard,
                    category: m.category,
                    categoryIndex: m.categoryIndex,
                    progress: m.progress.flashcard
                });
            }
            if (m.item.homework) {
                flatSubModules.push({
                    item: m.item.homework,
                    category: m.category,
                    categoryIndex: m.categoryIndex,
                    progress: m.progress.homework
                });
            }
        } else {
            flatSubModules.push(m);
        }
    }

    const flashcards = flatSubModules.filter(module => module.item.type !== 'article' && getCardsCount(module.item) > 0);
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
    if (!item) return '';
    if (item.type === 'article') {
        if (item.title === '课后题') {
            return `<span class="item-meta">课后题</span>`;
        }
        const isQuiz = item.id && item.id.includes('quiz');
        return `<span class="item-meta">${isQuiz ? '客观自测' : '讲义'}</span>`;
    }

    const total = progress?.total || 0;
    const seen = progress?.seen || 0;

    const label = total ? `已看 ${seen}/${total}` : '闪卡';
    return `
        <span class="item-meta">${label}</span>
    `;
}

function renderModule(module) {
    const { item, progress } = module;
    const theme = getTheme(item);
    const title = escapeHtml(item.title);
    const subtitle = escapeHtml(item.subtitle || '');

    if (item.type === 'course') {
        const quizProgress = progress.quiz;
        const fcProgress = progress.flashcard;
        const lectureProgress = progress.lecture;
        const homeworkProgress = progress.homework;
        
        const quizUrl = item.quiz ? getTargetUrl(item.quiz) : '#';
        const fcUrl = item.flashcard ? getTargetUrl(item.flashcard) : '#';
        const lectureUrl = item.lecture ? getTargetUrl(item.lecture) : '#';
        const homeworkUrl = item.homework ? getTargetUrl(item.homework) : '#';
        
        return `
            <div class="study-item course-card ${theme.tone}" aria-label="${title}">
                <div class="course-header">
                    <span class="item-icon" aria-hidden="true">
                        <i class="fa-solid ${theme.icon}"></i>
                    </span>
                    <span class="item-copy">
                        <strong>${title}</strong>
                        <small>${subtitle}</small>
                    </span>
                    ${item.examTime ? `<span class="exam-badge">${getExamCountdown(item.examTime)}</span>` : ''}
                </div>
                <div class="course-actions">
                    ${item.lecture ? `
                    <a class="course-action-btn lecture-btn" href="${escapeAttribute(lectureUrl)}" aria-label="${title}完整讲义">
                        <span class="btn-text">
                            <i class="fa-solid fa-book-open"></i> 完整讲义
                        </span>
                        <span class="btn-status">
                            ${renderProgress(item.lecture, lectureProgress)}
                        </span>
                    </a>
                    ` : ''}
                    ${item.quiz ? `
                    <a class="course-action-btn quiz-btn" href="${escapeAttribute(quizUrl)}" aria-label="${title}客观自测">
                        <span class="btn-text">
                            <i class="fa-solid fa-clipboard-question"></i> 客观自测
                        </span>
                        <span class="btn-status">
                            ${renderProgress(item.quiz, quizProgress)}
                        </span>
                    </a>
                    ` : ''}
                    ${item.flashcard ? `
                    <a class="course-action-btn flashcard-btn" href="${escapeAttribute(fcUrl)}" aria-label="${title}简答闪卡">
                        <span class="btn-text">
                            <i class="fa-solid fa-layer-group"></i> 简答闪卡
                        </span>
                        <span class="btn-status">
                            ${renderProgress(item.flashcard, fcProgress)}
                        </span>
                    </a>
                    ` : ''}
                    ${item.homework ? `
                    <a class="course-action-btn quiz-btn" href="${escapeAttribute(homeworkUrl)}" aria-label="${title}课后题">
                        <span class="btn-text">
                            <i class="fa-solid fa-clipboard-list"></i> 课后题
                        </span>
                        <span class="btn-status">
                            ${renderProgress(item.homework, homeworkProgress)}
                        </span>
                    </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

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

    let sortedItems = items;
    if (category.categoryId === 'major') {
        const now = new Date();
        sortedItems = [...items].sort((a, b) => {
            const timeA = a.item.examTime ? new Date(a.item.examTime) : null;
            const timeB = b.item.examTime ? new Date(b.item.examTime) : null;

            if (!timeA && !timeB) return 0;
            if (!timeA) return 1; 
            if (!timeB) return -1;

            const endedA = timeA - now < 0;
            const endedB = timeB - now < 0;

            if (endedA && !endedB) return 1;  // 考完的排在后面
            if (!endedA && endedB) return -1; // 没考完的排在前面

            return timeA - timeB; // 升序排序
        });
    }

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
                        ${sortedItems.map(renderModule).join('')}
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
function getExamCountdown(examTimeStr) {
    if (!examTimeStr) return null;
    const examDate = new Date(examTimeStr);
    const now = new Date();
    const diffMs = examDate - now;
    
    if (diffMs < 0) {
        return "已考完";
    }
    
    const oneDayMs = 1000 * 60 * 60 * 24;
    if (diffMs < oneDayMs) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours > 0 ? `剩 ${diffHours} 小时` : "即将开考";
    }
    
    const diffDays = Math.ceil(diffMs / oneDayMs);
    return `剩 ${diffDays} 天`;
}

function getUpcomingExam(categories) {
    const now = new Date();
    let closestExam = null;
    let minDiff = Infinity;

    for (const cat of categories) {
        if (!cat.items) continue;
        for (const item of cat.items) {
            if (item.type === 'course' && item.examTime) {
                const examDate = new Date(item.examTime);
                const diffMs = examDate - now;
                if (diffMs > 0 && diffMs < minDiff) {
                    minDiff = diffMs;
                    closestExam = item;
                }
            }
        }
    }
    return { closestExam, minDiff };
}

function renderExamAlertCard(closestExam, minDiff) {
    const oneDayMs = 1000 * 60 * 60 * 24;
    let timeText = '';
    if (minDiff < oneDayMs) {
        const diffHours = Math.floor(minDiff / (1000 * 60 * 60));
        timeText = diffHours > 0 ? `剩 ${diffHours} 小时` : "即将开考";
    } else {
        const diffDays = Math.ceil(minDiff / oneDayMs);
        timeText = `剩 ${diffDays} 天`;
    }

    const targetUrl = closestExam.quiz ? getTargetUrl(closestExam.quiz) : (closestExam.flashcard ? getTargetUrl(closestExam.flashcard) : '#');
    const title = escapeHtml(closestExam.title);

    return `
        <section class="resume-card exam-alert-card" aria-label="考试提醒">
            <div>
                <span class="section-label exam-label"><i class="fa-solid fa-clock"></i> 考试倒计时 ${timeText}</span>
                <h2>${title}</h2>
                <button class="view-all-exams-btn" onclick="showExamModal()"><i class="fa-solid fa-calendar-days"></i> 查看全部考试日程</button>
            </div>
            <a class="primary-action exam-action" href="${escapeAttribute(targetUrl)}">
                <span>冲刺复习</span>
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
        </section>
    `;
}

function initExamModal() {
    const oldModal = document.getElementById('exam-schedule-modal');
    if (oldModal) {
        oldModal.remove();
    }

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'exam-schedule-modal';
    modalOverlay.className = 'modal-overlay';
    
    const scheduleRows = (window.EXAM_SCHEDULE || []).map(item => {
        const isLinked = item.status && (item.status === '已关联' || item.status.startsWith('对应'));
        const statusHtml = isLinked 
            ? `<span class="status-badge status-linked">${escapeHtml(item.status)}</span>`
            : `<span class="status-badge status-unlinked">未关联</span>`;
            
        return `
            <tr>
                <td class="exam-date-td">${escapeHtml(item.date)}</td>
                <td class="exam-time-td">${escapeHtml(item.time)}</td>
                <td class="exam-subject-td">${escapeHtml(item.subject)}</td>
                <td>${statusHtml}</td>
            </tr>
        `;
    }).join('');

    modalOverlay.innerHTML = `
        <div class="exam-modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div class="modal-header">
                <h3 id="modal-title">📅 期末考试日程安排</h3>
                <button class="modal-close-btn" aria-label="关闭窗口" onclick="closeExamModal()">&times;</button>
            </div>
            <div style="overflow-x: auto;">
                <table class="exam-table">
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>时间</th>
                            <th>科目</th>
                            <th>关联说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scheduleRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeExamModal();
        }
    });

    document.body.appendChild(modalOverlay);
}

window.showExamModal = function() {
    initExamModal();
    const modal = document.getElementById('exam-schedule-modal');
    if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeExamModal = function() {
    const modal = document.getElementById('exam-schedule-modal');
    if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
    }
};

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

    const { closestExam, minDiff } = getUpcomingExam(filteredCategories);
    const topCardHtml = closestExam ? renderExamAlertCard(closestExam, minDiff) : renderResume(resume);

    requestAnimationFrame(() => {
        mainContainer.innerHTML = `
            ${topCardHtml}
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

    // 获取当前主题并设置图标与文档属性
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    themeIcon.className = savedTheme === 'dark' ? 'fa-solid fa-moon theme-icon' : 'fa-solid fa-sun theme-icon';
    document.documentElement.setAttribute('data-theme', savedTheme);

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
