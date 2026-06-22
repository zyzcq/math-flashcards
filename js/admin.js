const SESSION_KEY = 'math_flashcard_session';

const elements = {
    status: document.getElementById('status-text'),
    adminUser: document.getElementById('admin-user'),
    refreshBtn: document.getElementById('refresh-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    resetBtn: document.getElementById('reset-btn'),
    pageList: document.getElementById('page-list'),
    recentVisits: document.getElementById('recent-visits'),
    toast: document.getElementById('toast'),
    metrics: {
        total: document.getElementById('metric-total'),
        unique: document.getElementById('metric-unique'),
        today: document.getElementById('metric-today'),
        todayUnique: document.getElementById('metric-today-unique'),
        active: document.getElementById('metric-active'),
        pages: document.getElementById('metric-pages')
    }
};

let toastTimer = null;

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function formatNumber(value) {
    return new Intl.NumberFormat('zh-CN').format(Number(value) || 0);
}

function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function showToast(message) {
    if (!elements.toast) return;
    clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add('is-visible');
    toastTimer = setTimeout(() => {
        elements.toast.classList.remove('is-visible');
    }, 2200);
}

function setStatus(message) {
    if (elements.status) elements.status.textContent = message;
}

function getAnalyticsConfig() {
    return window.MATH_FLASHCARDS_ANALYTICS || {};
}

function renderThirdPartyFallback() {
    const config = getAnalyticsConfig();
    const provider = config.provider || 'third-party';
    const dashboardUrl = String(config.dashboardUrl || '').trim();

    renderMetrics({});
    renderRecentVisits([]);
    setStatus('当前使用第三方统计');

    if (elements.resetBtn) {
        elements.resetBtn.disabled = true;
        elements.resetBtn.title = '第三方统计数据需要在统计平台后台管理';
    }

    const dashboardLink = dashboardUrl
        ? `<a class="text-button" href="${escapeHtml(dashboardUrl)}" target="_blank" rel="noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                <span>打开统计后台</span>
           </a>`
        : '<span class="empty-state">请先在 js/analytics-config.js 填入统计平台 ID 和 dashboardUrl</span>';

    elements.pageList.innerHTML = `
        <div class="empty-state">
            <p>GitHub Pages 不能运行 Node 后端，访问数据会发送到 ${escapeHtml(provider)}。</p>
            ${dashboardLink}
        </div>
    `;
}

function redirectToLogin() {
    window.location.href = 'login.html?next=admin.html';
}

async function requestJson(url, options = {}) {
    const response = await fetch(url, {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        ...options
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(data.error || '请求失败');
        error.status = response.status;
        throw error;
    }
    return data;
}

function renderMetrics(summary = {}) {
    elements.metrics.total.textContent = formatNumber(summary.totalVisits);
    elements.metrics.unique.textContent = formatNumber(summary.uniqueVisitors);
    elements.metrics.today.textContent = formatNumber(summary.todayVisits);
    elements.metrics.todayUnique.textContent = formatNumber(summary.todayUniqueVisitors);
    elements.metrics.active.textContent = formatNumber(summary.activeVisitors);
    elements.metrics.pages.textContent = formatNumber(summary.trackedPages);
}

function renderPages(pages = []) {
    if (!pages.length) {
        elements.pageList.innerHTML = '<div class="empty-state">暂无页面访问记录</div>';
        return;
    }

    elements.pageList.innerHTML = pages.slice(0, 20).map(page => `
        <div class="page-row">
            <div class="page-main">
                <span class="page-path">${escapeHtml(page.path)}</span>
                <span class="page-meta">
                    <span>${formatNumber(page.uniqueVisitors)} 位访客</span>
                    <span>最近 ${formatDateTime(page.lastSeen)}</span>
                </span>
            </div>
            <div class="page-count">${formatNumber(page.visits)} 次</div>
        </div>
    `).join('');
}

function renderRecentVisits(visits = []) {
    if (!visits.length) {
        elements.recentVisits.innerHTML = '<tr><td class="empty-row" colspan="4">暂无访问记录</td></tr>';
        return;
    }

    elements.recentVisits.innerHTML = visits.slice(0, 50).map(visit => `
        <tr>
            <td>${formatDateTime(visit.at)}</td>
            <td>${escapeHtml(visit.path)}</td>
            <td class="mono-cell">${escapeHtml(visit.visitorId)}</td>
            <td class="device-cell">${escapeHtml(visit.userAgent || '-')}</td>
        </tr>
    `).join('');
}

function renderStats(data) {
    renderMetrics(data.summary);
    renderPages(data.pages);
    renderRecentVisits(data.recentVisits);
    setStatus(`最后更新 ${formatDateTime(data.generatedAt)}`);
}

async function loadStats() {
    try {
        setStatus('??????');
        const data = await requestJson('/api/admin/stats');
        renderStats(data);
    } catch (error) {
        if (error.status === 401) {
            redirectToLogin();
            return;
        }
        renderThirdPartyFallback();
        showToast('?????????????');
    }
}

async function checkSession() {
    try {
        const me = await requestJson('/api/me');
        if (!me.isAdmin) {
            redirectToLogin();
            return false;
        }
        elements.adminUser.textContent = me.username;
        localStorage.setItem(SESSION_KEY, JSON.stringify({
            username: me.username,
            loginTime: Date.now()
        }));
        return true;
    } catch {
        renderThirdPartyFallback();
        return false;
    }
}

async function handleLogout() {
    try {
        await requestJson('/api/logout', { method: 'POST', body: '{}' });
    } catch {
        // Local session cleanup still matters if the server is unavailable.
    }
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
}

async function handleReset() {
    if (!window.confirm('确定清空所有访问统计吗？')) return;
    try {
        const data = await requestJson('/api/admin/stats/reset', { method: 'POST', body: '{}' });
        renderStats(data);
        showToast('统计已清空');
    } catch (error) {
        if (error.status === 401) {
            redirectToLogin();
            return;
        }
        showToast('清空失败');
    }
}

async function initAdmin() {
    elements.refreshBtn?.addEventListener('click', loadStats);
    elements.logoutBtn?.addEventListener('click', handleLogout);
    elements.resetBtn?.addEventListener('click', handleReset);

    const ok = await checkSession();
    if (ok) {
        await loadStats();
        window.setInterval(loadStats, 60000);
    }
}

document.addEventListener('DOMContentLoaded', initAdmin);
